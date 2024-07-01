import { ChangeEvent, SyntheticEvent, useState } from "react";
import "./App.css";
import CardList from "./Components/CardList/CardList";
import Search from "./Components/Search/Search";
import { ICompanySearch } from "./company";
import { searchCompanies } from "./api";

function App() {
    const [search, setSearch] = useState<string>("");
    const [searchResult, setSearchResult] = useState<ICompanySearch[]>([]);
    const [serverError, setServerError] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        console.log(e);
    };

    const onClick = async (e: SyntheticEvent) => {
        const result = await searchCompanies(search);
        if (typeof result === "string") {
            setServerError(result);
        } else if (Array.isArray(result.data)) {
            setSearchResult(result.data);
            setServerError("");
        }
    };

    return (
        <div className="App">
            <Search onClick={onClick} search={search} handleChange={handleChange} />
            {serverError && <h1>{serverError}</h1>}
            <CardList searchResults={searchResult} />
        </div>
    );
}

export default App;
