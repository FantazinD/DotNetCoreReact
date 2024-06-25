import React from "react";
import "./CardList.css";
import Card from "../Card/Card";

interface IProps {}

const CardList = (props: IProps) => {
    return (
        <div>
            <Card />
            <Card />
            <Card />
        </div>
    );
};

export default CardList;
