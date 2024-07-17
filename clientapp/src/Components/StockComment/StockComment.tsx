import "./StockComment.css";
import React from "react";
import StockCommentForm from "./StockCommentForm/StockCommentForm";
import { commentPostAPI } from "../../Services/CommentService";
import { toast } from "react-toastify";

interface IProps {
    stockSymbol: string;
}

type CommentFormInputs = {
    title: string;
    content: string;
};

const StockComment = ({ stockSymbol }: IProps) => {
    const handleComment = (e: CommentFormInputs) => {
        commentPostAPI(e.title, e.content, stockSymbol)
            .then((res) => {
                if (res) {
                    toast.success("Comment created successfully!");
                }
            })
            .catch((e) => {
                toast.warning(e);
            });
    };

    return <StockCommentForm stockSymbol={stockSymbol} handleComment={handleComment} />;
};

export default StockComment;
