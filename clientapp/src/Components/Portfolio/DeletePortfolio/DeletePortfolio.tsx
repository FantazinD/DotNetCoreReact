import React, { SyntheticEvent } from "react";
import "./DeletePortfolio.css";

interface IProps {
    portfolioValue: string;
    onPortfolioDelete: (e: SyntheticEvent) => void;
}

const DeletePortfolio = ({ onPortfolioDelete, portfolioValue }: IProps) => {
    return (
        <div>
            <form onSubmit={onPortfolioDelete}>
                <input hidden={true} value={portfolioValue} readOnly={true} />
                <button>X</button>
            </form>
        </div>
    );
};

export default DeletePortfolio;
