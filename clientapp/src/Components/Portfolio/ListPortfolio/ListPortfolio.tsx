import React, { SyntheticEvent } from "react";
import "./ListPortfolio.css";
import CardPortfolio from "../CardPortfolio/CardPortfolio";

interface IProps {
    portfolioValues: string[];
    onPortfolioDelete: (e: SyntheticEvent) => void;
}

const ListPortfolio = ({ portfolioValues, onPortfolioDelete }: IProps) => {
    return (
        <>
            <h3>My Portfolio</h3>
            <ul>
                {portfolioValues &&
                    portfolioValues.map((portfolioValue: string) => {
                        return (
                            <CardPortfolio
                                key={portfolioValue}
                                portfolioValue={portfolioValue}
                                onPortfolioDelete={onPortfolioDelete}
                            />
                        );
                    })}
            </ul>
        </>
    );
};

export default ListPortfolio;
