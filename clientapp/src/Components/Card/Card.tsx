import React from "react";
import "./Card.css";

type Props = {};

const Card = (props: Props) => {
    return (
        <div className="card">
            <img src="" alt="Image" />
            <div className="details">
                <h2>AAPL</h2>
                <p>$110</p>
            </div>
            <p className="info">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit, voluptates!</p>
        </div>
    );
};

export default Card;
