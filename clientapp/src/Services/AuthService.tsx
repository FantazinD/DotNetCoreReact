import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";
import config from "../config.json";

export const loginAPI = async (username: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(`${config.API_URL}/account/login`, {
            username: username,
            password: password,
        });

        return data;
    } catch (error) {
        handleError(error);
    }
};

export const registerAPI = async (email: string, username: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(`${config.API_URL}/account/register`, {
            email: email,
            username: username,
            password: password,
        });

        return data;
    } catch (error: any) {
        return error.response;
    }
};
