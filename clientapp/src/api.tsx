import axios from "axios";
import {
    ICompanyBalanceSheet,
    ICompanyCashFlow,
    ICompanyHistoricalDividend,
    ICompanyIncomeStatement,
    ICompanyKeyMetrics,
    ICompanyProfile,
    ICompanySearch,
    ICompanyTenK,
} from "./company";
import config from "./config.json";
import { handleError } from "./Helpers/ErrorHandler";

interface ISearchResponse {
    data: ICompanySearch[];
}

export const searchCompanies = async (query: string) => {
    try {
        const data = await axios.get<ISearchResponse>(
            `${config.FMP_API_URL}/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${config.REACT_APP_API}`
        );
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.message;
        } else {
            return "An expected error has occured.";
        }
    }
};

export const getCompanyProfile = async (query: string) => {
    try {
        const data = await axios.get<ICompanyProfile[]>(
            `${config.FMP_API_URL}/v3/profile/${query}?apikey=${config.REACT_APP_API}`
        );
        return data;
    } catch (error: any) {
        handleError(error);
    }
};

export const getKeyMetrics = async (query: string) => {
    try {
        const data = await axios.get<ICompanyKeyMetrics[]>(
            `${config.FMP_API_URL}/v3/key-metrics-ttm/${query}?limit=40&apikey=${config.REACT_APP_API}`
        );
        return data;
    } catch (error: any) {
        handleError(error);
    }
};

export const getIncomeStatement = async (query: string) => {
    try {
        const data = await axios.get<ICompanyIncomeStatement[]>(
            `${config.FMP_API_URL}/v3/income-statement/${query}?limit=40&apikey=${config.REACT_APP_API}`
        );
        return data;
    } catch (error: any) {
        handleError(error);
    }
};

export const getBalanceSheet = async (query: string) => {
    try {
        const data = await axios.get<ICompanyBalanceSheet[]>(
            `${config.FMP_API_URL}/v3/balance-sheet-statement/${query}?limit=40&apikey=${config.REACT_APP_API}`
        );
        return data;
    } catch (error: any) {
        handleError(error);
    }
};

export const getHistoricalDividend = async (query: string) => {
    try {
        const data = await axios.get<ICompanyHistoricalDividend>(
            `${config.FMP_API_URL}/v3/historical-price-full/stock_dividend/${query}?apikey=${config.REACT_APP_API}`
        );
        return data;
    } catch (error: any) {
        handleError(error);
    }
};

export const getCashFlow = async (query: string) => {
    try {
        const data = await axios.get<ICompanyCashFlow[]>(
            `${config.FMP_API_URL}/v3/cash-flow-statement/${query}?limit=100&apikey=${config.REACT_APP_API}`
        );
        return data;
    } catch (error: any) {
        handleError(error);
    }
};

export const getTenK = async (query: string) => {
    try {
        const data = await axios.get<ICompanyTenK[]>(
            `${config.FMP_API_URL}/v3/sec_filings/${query}?type=10-K&page=0&apikey=${config.REACT_APP_API}`
        );
        return data;
    } catch (error: any) {
        handleError(error);
    }
};
