import React from "react";
import "./CardList.css";
import Card from "../Card/Card";
import { ICompanySearch } from "../../company";
import { v4 as uuidv4 } from "uuid";

interface IProps {
    searchResults: ICompanySearch[];
}

const CardList: React.FC<IProps> = ({ searchResults }: IProps): JSX.Element => {
    return (
        <div>
            {searchResults.length > 0 ? (
                <>
                    {searchResults.map((result: ICompanySearch) => {
                        return <Card id={result.symbol} key={uuidv4()} searchResult={result} />;
                    })}
                </>
            ) : (
                <h1>No Results!</h1>
            )}
        </div>
    );
};

export default CardList;

// {searchResults.map((companySearchResult) => (
//     <Card
//         companyName={companySearchResult.name}
//         ticker={companySearchResult.symbol}
//         price={companySearchResult.currency}
//     />
// ))}
