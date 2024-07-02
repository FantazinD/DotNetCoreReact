import React, { SyntheticEvent } from "react";

interface IProps {
    onPortfolioCreate: (e: SyntheticEvent) => void;
    symbol: string;
}

const AddPortfolio = ({ onPortfolioCreate, symbol }: IProps) => {
    return (
        <form onSubmit={onPortfolioCreate}>
            <input readOnly={true} hidden={true} value={symbol} />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddPortfolio;
