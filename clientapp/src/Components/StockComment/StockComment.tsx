import "./StockComment.css";
import { useEffect, useState } from "react";
import StockCommentForm from "./StockCommentForm/StockCommentForm";
import { commentGetAPI, commentPostAPI } from "../../Services/CommentService";
import { toast } from "react-toastify";
import { CommentGet } from "../../Models/Comment";
import StockCommentList from "../StockCommentList/StockCommentList";
import ShimmerComment from "./ShimmerComment/ShimmerComment";

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
        commentGetAPI(stockSymbol)
            .then((res: any) => {
                setComments(res?.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="flex flex-col mr-4">
            {isLoading ? <ShimmerComment></ShimmerComment> : <StockCommentList comments={comments!} />}
            <StockCommentForm stockSymbol={stockSymbol} handleComment={handleComment} />
        </div>
    );
};

export default StockComment;
