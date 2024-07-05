import RatioList from "../../Components/RatioList/RatioList";
import Table from "../../Components/Table/Table";
import { TestDataCompany } from "../../Components/Table/testData";
import "./DesignPage.css";
import React from "react";

interface IProps {}

const data = TestDataCompany;

const tableConfig = [
    {
        label: "symbol",
        render: (company: any) => company.symbol,
    },
];

const DesignPage = ({}: IProps) => {
    return (
        <>
            <h1>
                Design guide - This is the design guide for FinShark. These are reuable components of the app with brief
                instructions on how to use them.
            </h1>
            <RatioList config={tableConfig} data={data} />
            <Table />
            <h3>
                Table - Table takes in a configuration object and company data as params. Use the config to style your
                table.
            </h3>
        </>
    );
};

export default DesignPage;
