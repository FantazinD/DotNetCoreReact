import { PortfolioGet, PortfolioPost } from "../Models/Portfolio";
import { handleError } from "../Helpers/ErrorHandler";
import config from "../config.json";
import axios from "axios";

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
    const data = await axios.post<PortfolioPost>(`${config.API_URL}/portfolio?stockSymbol=${symbol}`, null, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    return data;
};

export const portfolioDeleteAPI = async (symbol: string) => {
    const data = await axios.delete<PortfolioPost>(`${config.API_URL}/portfolio?stockSymbol=${symbol}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    return data;
};
