import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { PortfolioGet, PortfolioPost } from "../Models/Portfolio";
import config from "../config.json";

export const portfolioGetAPI = async () => {
    try {
        const data = await axios.get<PortfolioGet[]>(`${config.API_URL}/portfolio`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        return data;
    } catch (error) {
        handleError(error);
    }
};

export const portfolioAddAPI = async (symbol: string) => {
    try {
        const data = await axios.post<PortfolioPost>(`${config.API_URL}/portfolio?stockSymbol=${symbol}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        return data;
    } catch (error) {
        handleError(error);
    }
};

export const portfolioDeleteAPI = async (symbol: string) => {
    try {
        const data = await axios.delete<PortfolioPost>(`${config.API_URL}/portfolio?stockSymbol=${symbol}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        return data;
    } catch (error) {
        handleError(error);
    }
};
