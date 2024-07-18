import "./StockComment.css";
import React, { useEffect, useState } from "react";
import StockCommentForm from "./StockCommentForm/StockCommentForm";
import { commentGetAPI, commentPostAPI } from "../../Services/CommentService";
import { toast } from "react-toastify";
import { CommentGet } from "../../Models/Comment";
import Spinner from "../Spinner/Spinner";
import StockCommentList from "../StockCommentList/StockCommentList";

interface IProps {
    stockSymbol: string;
}

type CommentFormInputs = {
    title: string;
    content: string;
};

const StockComment = ({ stockSymbol }: IProps) => {
    const [comments, setComments] = useState<CommentGet[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getComments();
    }, []);

    const handleComment = (e: CommentFormInputs) => {
        commentPostAPI(e.title, e.content, stockSymbol)
            .then((res) => {
                if (res) {
                    toast.success("Comment created successfully!");
                    getComments();
                }
            })
            .catch((e) => {
                toast.warning(e);
            });
    };

    const getComments = () => {
        setIsLoading(true);
        commentGetAPI(stockSymbol).then((res: any) => {
            setIsLoading(false);
            setComments(res?.data);
        });
    };

    return (
        <div className="flex flex-col">
            {isLoading ? <Spinner /> : <StockCommentList comments={comments!} />}
            <StockCommentForm stockSymbol={stockSymbol} handleComment={handleComment} />
        </div>
    );
};

export default StockComment;
