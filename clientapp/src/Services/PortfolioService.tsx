import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";
import { PortfolioGet, PortfolioPost } from "../Models/Portfolio";

const api = "http://localhost:5253/api/portfolio";

export const portfolioGetAPI = async () => {
    try {
        const data = await axios.get<PortfolioGet[]>(`${api}`);

        return data;
    } catch (error) {
        handleError(error);
    }
};

export const portfolioAddAPI = async (symbol: string) => {
    try {
        const data = await axios.post<PortfolioPost>(`${api}?stockSymbol=${symbol}`);

        return data;
    } catch (error) {
        handleError(error);
    }
};

export const portfolioDeleteAPI = async (symbol: string) => {
    try {
        const data = await axios.delete<PortfolioPost>(`${api}?stockSymbol=${symbol}`);

        return data;
    } catch (error) {
        handleError(error);
    }
};
