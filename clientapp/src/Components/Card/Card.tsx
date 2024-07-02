import React, { SyntheticEvent } from "react";
import "./Card.css";
import { ICompanySearch } from "../../company";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio";

interface IProps {
    id: string;
    searchResult: ICompanySearch;
    onPortfolioCreate: (e: SyntheticEvent) => void;
}

const Card: React.FC<IProps> = ({ id, searchResult, onPortfolioCreate }: IProps): JSX.Element => {
    return (
        <div key={id} id={id} className="card">
            <img src="" alt="Company Logo" />
            <div className="details">
                <h2>{`${searchResult.name} (${searchResult.symbol})`}</h2>
                <p>{`${searchResult.currency}`}</p>
            </div>
            <p className="info">
                {searchResult.exchangeShortName} - {searchResult.stockExchange}
            </p>
            <AddPortfolio onPortfolioCreate={onPortfolioCreate} symbol={searchResult.symbol} />
        </div>
    );
};

export default Card;
