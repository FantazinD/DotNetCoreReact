import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import "./SearchPage.css";
import { ICompanySearch } from "../../company";
import { searchCompanies } from "../../api";
import Search from "../../Components/Search/Search";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import CardList from "../../Components/CardList/CardList";
import { PortfolioGet } from "../../Models/Portfolio";
import { portfolioAddAPI, portfolioDeleteAPI, portfolioGetAPI } from "../../Services/PortfolioService";
import { toast } from "react-toastify";

interface IProps {}

const SearchPage = ({}: IProps) => {
    const [search, setSearch] = useState<string>("");
    const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>(null);
    const [searchResult, setSearchResult] = useState<ICompanySearch[] | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        getPortfolio();
    }, []);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const getPortfolio = () => {
        portfolioGetAPI()
            .then((res: any) => {
                setPortfolioValues(res?.data);
            })
            .catch((e) => {
                toast.warning("Could not get portfolio values!");
            });
    };

    const onSearchSubmit = async (e: SyntheticEvent) => {
        setIsLoading(true);
        e.preventDefault();
        const result = await searchCompanies(search);
        if (typeof result === "string") {
            setServerError(result);
        } else if (Array.isArray(result.data)) {
            const portfolios = portfolioValues?.map((portfolioValue) => portfolioValue.symbol);
            setSearchResult(result.data.filter((res) => !portfolios?.includes(res.symbol)));
            setServerError("");
        }
        setIsLoading(false);
    };

    const onPortfolioDelete = (e: any) => {
        e.preventDefault();

        const stockSymbol = e.target[0].value;
        let portfolios = portfolioValues!;

        let updatedPortfolios = portfolios.filter((portfolio) => portfolio.symbol !== stockSymbol);
        setPortfolioValues(updatedPortfolios);

        portfolioDeleteAPI(e.target[0].value).catch((e) => {
            setPortfolioValues(portfolios);
            toast.error("Could not delete stock from portfolio!");
        });
    };

    const onPortfolioCreate = (e: any) => {
        e.preventDefault();

        const stockSymbol = e.target[0].value;
        let portfolios = portfolioValues || [];
        let updatedSearchResult = searchResult!.filter((res) => res.symbol !== stockSymbol);

        portfolios.push({
            symbol: stockSymbol,
        });
        setPortfolioValues(portfolios);

        setSearchResult(updatedSearchResult);

        portfolioAddAPI(stockSymbol).catch((e) => {
            portfolios = portfolios.filter((portfolio) => portfolio.symbol !== stockSymbol);
            setPortfolioValues(portfolios);

            toast.error("Could not add stock to portfolio!");
        });
    };

    return (
        <>
            <Search
                onSearchSubmit={onSearchSubmit}
                search={search}
                handleSearchChange={handleSearchChange}
                isLoading={isLoading}
            />
            <ListPortfolio portfolioValues={portfolioValues} onPortfolioDelete={onPortfolioDelete} />
            <CardList searchResults={searchResult} onPortfolioCreate={onPortfolioCreate} />
            {serverError && <div>Unable to connect to API</div>}
        </>
    );
};

export default SearchPage;
