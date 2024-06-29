import axios from "axios";
import { ICompanySearch } from "./company";

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
