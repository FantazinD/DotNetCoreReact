import "./StockComment.css";
import React from "react";
import StockCommentForm from "./StockCommentForm/StockCommentForm";

interface IProps {
    stockSymbol: string;
}

const StockComment = ({ stockSymbol }: IProps) => {
    return <StockCommentForm stockSymbol={stockSymbol} handleComment={() => {}} />;
};

export default StockComment;
