import React, { SyntheticEvent } from "react";
import "./CardList.css";
import Card from "../Card/Card";
import { ICompanySearch } from "../../company";
import { v4 as uuidv4 } from "uuid";

interface IProps {
    searchResults: ICompanySearch[] | null;
    onPortfolioCreate: (e: SyntheticEvent) => void;
}

const CardList: React.FC<IProps> = ({ searchResults, onPortfolioCreate }: IProps): JSX.Element => {
    return (
        <div>
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
        </div>
    );
};

export default CardList;
