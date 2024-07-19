import { CommentGet } from "../../Models/Comment";
import "./StockCommentList.css";
import StockCommentListItem from "./StockCommentListItem/StockCommentListItem";
import { v4 as uuidv4 } from "uuid";

interface IProps {
    comments: CommentGet[];
}

const StockCommentList = ({ comments }: IProps) => {
    return (
        <>
            {comments
                ? comments.map((comment) => {
                      return <StockCommentListItem key={uuidv4()} comment={comment} />;
                  })
                : ""}
        </>
    );
};

export default StockCommentList;
