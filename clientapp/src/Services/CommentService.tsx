import axios from "axios";
import { CommentGet, CommentPost } from "../Models/Comment";
import { handleError } from "../Helpers/ErrorHandler";
import config from "../config.json";

const apiConfig = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
};

export const commentPostAPI = async (title: string, content: string, stockSymbol: string) => {
    try {
        const data = await axios.post<CommentPost>(`${config.API_URL}/comment/${stockSymbol}`, {
            title: title,
            content: content,
            stockSymbol: stockSymbol,
            headers: apiConfig.headers,
        });

        return data;
    } catch (error) {
        handleError(error);
    }
};

export const commentGetAPI = async (stockSymbol: string) => {
    try {
        const data = await axios.get<CommentGet[]>(`${config.API_URL}/comment?Symbol=${stockSymbol}`, apiConfig);

        return data;
    } catch (error) {
        handleError(error);
    }
};
