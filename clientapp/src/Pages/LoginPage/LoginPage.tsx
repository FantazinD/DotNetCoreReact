import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Context/useAuth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import "./LoginPage.css";

interface IProps {}

type LoginFormsInput = {
    userName: string;
    password: string;
};

const validation = Yup.object().shape({
    userName: Yup.string().required("Username is required."),
    password: Yup.string().required("Password is required."),
});

const LoginPage = ({}: IProps) => {
    const { loginUser, isLoading } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormsInput>({ resolver: yupResolver(validation) });

    const handleLogin = (form: LoginFormsInput) => {
        loginUser(form.userName, form.password);
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mb-20 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 relative z-0">
                    {isLoading && (
                        <>
                            <div className="absolute left-0 top-0 z-10 w-full" id="progressBar">
                                <div className="h-1.5 w-full bg-teal-100 overflow-hidden rounded-t-lg">
                                    <div className="animate-progress w-full h-full bg-lightGreen origin-left-right"></div>
                                </div>
                            </div>
                            <div className="fixed inset-0 bg-gray-500 opacity-20 z-20"></div> {/* Overlay */}
                        </>
                    )}
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleLogin)}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Username"
                                    {...register("userName")}
                                />
                                {errors.userName ? <p className="text-white">{errors.userName.message}</p> : ""}
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...register("password")}
                                />
                                {errors.password ? <p className="text-white">{errors.password.message}</p> : ""}
                            </div>
                            <div className="flex items-center justify-between">
                                <a
                                    href="#"
                                    className="text-sm text-white font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-lightGreen hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Sign in
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?{" "}
                                <Link
                                    to="/register"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Signup
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
