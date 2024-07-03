import React from "react";

interface IProps {
    portfolioValue: string;
}

const CardPortfolio = ({ portfolioValue }: IProps) => {
    return (
        <>
            <h4>{portfolioValue}</h4>
            <button>X</button>
        </>
    );
};

export default CardPortfolio;
