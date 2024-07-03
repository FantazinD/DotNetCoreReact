import { ChangeEvent, SyntheticEvent, useState } from "react";
import "./SearchPage.css";
import { ICompanySearch } from "../../company";
import { searchCompanies } from "../../api";
import Search from "../../Components/Search/Search";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import CardList from "../../Components/CardList/CardList";

interface IProps {}

const SearchPage = ({}: IProps) => {
    const [search, setSearch] = useState<string>("");
    const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
    const [searchResult, setSearchResult] = useState<ICompanySearch[]>([]);
    const [serverError, setServerError] = useState<string | null>(null);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onSearchSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const result = await searchCompanies(search);
        if (typeof result === "string") {
            setServerError(result);
        } else if (Array.isArray(result.data)) {
            setSearchResult(result.data);
            setServerError("");
        }
    };

    const onPortfolioDelete = (e: any) => {
        e.preventDefault();
        console.log(e);
        const updatedPortfolioValues = portfolioValues.filter((value: string) => {
            return value !== e.target[0].value;
        });
        setPortfolioValues(updatedPortfolioValues);
    };

    const onPortfolioCreate = (e: any) => {
        e.preventDefault();
        const exists = portfolioValues.find((value: string) => value === e.target[0].value);
        if (exists) return;
        const updatedPortfolioValues = [...portfolioValues, e.target[0].value];
        setPortfolioValues(updatedPortfolioValues);
    };

    return (
        <>
            <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange} />
            <ListPortfolio portfolioValues={portfolioValues} onPortfolioDelete={onPortfolioDelete} />
            <CardList searchResults={searchResult} onPortfolioCreate={onPortfolioCreate} />
            {serverError && <div>Unable to connect to API</div>}
        </>
    );
};

export default SearchPage;
