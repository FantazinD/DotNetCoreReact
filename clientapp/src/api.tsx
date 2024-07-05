import axios from "axios";
import {
    ICompanyBalanceSheet,
    ICompanyIncomeStatement,
    ICompanyKeyMetrics,
    ICompanyProfile,
    ICompanySearch,
} from "./company";

interface ISearchResponse {
    data: ICompanySearch[];
}

export const searchCompanies = async (query: string) => {
    try {
        const data = await axios.get<ISearchResponse>(
            `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_API_KEY}`
        );
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("error message: ", error.message);
            return error.message;
        } else {
            console.log("unexpected error: ", error);
            return "An expected error has occured.";
        }
    }
};

export const getCompanyProfile = async (query: string) => {
    try {
        const data = await axios.get<ICompanyProfile[]>(
            `https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${process.env.REACT_APP_API_KEY}`
        );
        return data;
    } catch (error: any) {
        console.log("error message: ", error.message);
        // if (axios.isAxiosError(error)) {
        //     console.log("error message: ", error.message);
        //     return error.message;
        // } else {
        //     console.log("unexpected error: ", error);
        //     return "An expected error has occured.";
        // }
    }
};

export const getKeyMetrics = async (query: string) => {
    try {
        const data = await axios.get<ICompanyKeyMetrics[]>(
            `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`
        );
        return data;
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};

export const getIncomeStatement = async (query: string) => {
    try {
        const data = await axios.get<ICompanyIncomeStatement[]>(
            `https://financialmodelingprep.com/api/v3/income-statement/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`
        );
        return data;
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};

export const getBalanceSheet = async (query: string) => {
    try {
        const data = await axios.get<ICompanyBalanceSheet[]>(
            `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`
        );
        return data;
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};
