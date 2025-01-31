import React, { SyntheticEvent } from "react";
import { ICompanySearch } from "../../company";
import { v4 as uuidv4 } from "uuid";
import Card from "../Card/Card";
import "./CardList.css";

interface IProps {
    searchResults: ICompanySearch[] | null;
    onPortfolioCreate: (e: SyntheticEvent) => void;
}

const CardList: React.FC<IProps> = ({ searchResults, onPortfolioCreate }: IProps): JSX.Element => {
    return (
        <>
            {searchResults && searchResults.length > 0 ? (
                <>
                    {searchResults.map((result: ICompanySearch) => {
                        return (
                            <Card
                                id={result.symbol}
                                key={uuidv4()}
                                searchResult={result}
                                onPortfolioCreate={onPortfolioCreate}
                            />
                        );
                    })}
                </>
            ) : searchResults && searchResults.length == 0 ? (
                <p className="mb-3 mt-10 text-xl font-semibold text-center md:text-xl">No results!</p>
            ) : null}
        </>
    );
};

export default CardList;
