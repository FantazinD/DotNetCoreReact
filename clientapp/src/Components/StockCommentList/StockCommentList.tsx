import { CommentGet } from "../../Models/Comment";
import "./StockCommentList.css";
import StockCommentListItem from "./StockCommentListItem/StockCommentListItem";

interface IProps {
    comments: CommentGet[];
}

const StockCommentList = ({ comments }: IProps) => {
    return (
        <>
            {comments
                ? comments.map((comment) => {
                      return <StockCommentListItem comment={comment} />;
                  })
                : ""}
        </>
    );
};

export default StockCommentList;
