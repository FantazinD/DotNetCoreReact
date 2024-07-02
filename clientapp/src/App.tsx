import { ChangeEvent, SyntheticEvent, useState } from "react";
import "./App.css";
import CardList from "./Components/CardList/CardList";
import Search from "./Components/Search/Search";
import { ICompanySearch } from "./company";
import { searchCompanies } from "./api";

function App() {
    const [search, setSearch] = useState<string>("");
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

    const onPortfolioCreate = (e: SyntheticEvent) => {
        e.preventDefault();
        console.log(e);
    };

    return (
        <div className="App">
            <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange} />
            {serverError && <h1>{serverError}</h1>}
            <CardList searchResults={searchResult} onPortfolioCreate={onPortfolioCreate} />
        </div>
    );
}

export default App;
