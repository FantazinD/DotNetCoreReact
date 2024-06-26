import React from "react";
import "./Card.css";

interface IProps {
    companyName: string;
    ticker: string;
    price: number;
}

const Card: React.FC<IProps> = (props: IProps): JSX.Element => {
    return (
        <div className="card">
            <img src="" alt="Image" />
            <div className="details">
                <h2>{`${props.companyName} (${props.ticker})`}</h2>
                <p>{`$${props.price}`}</p>
            </div>
            <p className="info">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit, voluptates!</p>
        </div>
    );
};

export default Card;
