import React from "react";
import "./ListPortfolio.css";
import CardPortfolio from "../CardPortfolio/CardPortfolio";

interface IProps {
    portfolioValues: string[];
}

const ListPortfolio = ({ portfolioValues }: IProps) => {
    return (
        <>
            <h3>My Portfolio</h3>
            <ul>
                {portfolioValues &&
                    portfolioValues.map((portfolioValue: string) => {
                        return <CardPortfolio portfolioValue={portfolioValue} />;
                    })}
            </ul>
        </>
    );
};

export default ListPortfolio;
