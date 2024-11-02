import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import axios from "axios";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    isLoading: boolean | null;
    registerUser: (username: string, email: string, password: string) => void;
    loginUser: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};

type Props = { children: ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        setIsReady(true);
    }, []);

    const registerUser = async (email: string, username: string, password: string) => {
        setIsLoading(true);
        await registerAPI(email, username, password)
            .then((response: any) => {
                localStorage.setItem("token", response?.data.token);

                const userObj = {
                    userName: response?.data.userName,
                    email: response?.data.email,
                };

                localStorage.setItem("user", JSON.stringify(userObj));

                setToken(response?.data.token!);
                setUser(userObj!);
                toast.success("Login Success!");
                navigate("/search");
            })
            .catch((e) => toast.warning("Server error occurred"))
            .finally(() => {
                setIsLoading(false);
            });
    };

    const loginUser = async (username: string, password: string) => {
        setIsLoading(true);
        await loginAPI(username, password)
            .then((response: any) => {
                if (!response) {
                    toast.warning("Incorrect username and/or password!");
                    return;
                }

                localStorage.setItem("token", response?.data.token);

                const userObj = {
                    userName: response?.data.userName,
                    email: response?.data.email,
                };

                localStorage.setItem("user", JSON.stringify(userObj));

                setToken(response?.data.token!);
                setUser(userObj!);
                toast.success("Login Success!");
                navigate("/search");
            })
            .catch((e) => toast.warning("Server error occurred"))
            .finally(() => {
                setIsLoading(false);
            });
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
        setToken("");
        navigate("/");
    };

    return (
        <UserContext.Provider value={{ loginUser, user, token, logout, isLoggedIn, registerUser, isLoading }}>
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => useContext(UserContext);
