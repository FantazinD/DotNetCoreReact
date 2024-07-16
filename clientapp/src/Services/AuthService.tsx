import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5167/api";

export const loginAPI = async (username: string, password: string) => {
    try {
        const data = await axios.post<any>(`apiaccount/login"`, {
            username: username,
            password: password,
        });

        return data;
    } catch (error) {
        handleError(error);
    }
};
