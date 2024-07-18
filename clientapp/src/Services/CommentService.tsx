import axios from "axios";
import { CommentGet, CommentPost } from "../Models/Comment";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5253/api/comment";

export const commentPostAPI = async (title: string, content: string, stockSymbol: string) => {
    try {
        const data = await axios.post<CommentPost>(`${api}/${stockSymbol}`, {
            title: title,
            content: content,
            stockSymbol: stockSymbol,
        });

        return data;
    } catch (error) {
        handleError(error);
    }
};

export const commentGetAPI = async (stockSymbol: string) => {
    try {
        const data = await axios.get<CommentGet[]>(`${api}?Symbol=${stockSymbol}`);

        return data;
    } catch (error) {
        handleError(error);
    }
};
