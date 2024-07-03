import React, { SyntheticEvent } from "react";
import "./Card.css";
import { ICompanySearch } from "../../company";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio";
import { Link } from "react-router-dom";

interface IProps {
    id: string;
    searchResult: ICompanySearch;
    onPortfolioCreate: (e: SyntheticEvent) => void;
}

const Card: React.FC<IProps> = ({ id, searchResult, onPortfolioCreate }: IProps): JSX.Element => {
    return (
        <div
            key={id}
            id={id}
            className="flex flex-col items-center justify-between w-full p-6 bg-slate-100 rounded-lg md:flex-row"
        >
            <Link to={`/company/${searchResult.symbol}`} className="font-bold text-center text-black md:text-left">
                {searchResult.name} ({searchResult.symbol})
            </Link>
            <p className="text-black">{searchResult.currency}</p>
            <p className="font-bold text-black">
                {searchResult.exchangeShortName} - {searchResult.stockExchange}
            </p>
            <AddPortfolio onPortfolioCreate={onPortfolioCreate} symbol={searchResult.symbol} />
        </div>
    );
};

export default Card;
