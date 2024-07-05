import { useOutletContext } from "react-router-dom";
import { ICompanyIncomeStatement } from "../../company";
import "./IncomeStatement.css";
import { useEffect, useState } from "react";
import { getIncomeStatement } from "../../api";
import Table from "../Table/Table";

interface IProps {}

const configs = [
    {
        label: "Date",
        render: (company: ICompanyIncomeStatement) => company.date,
    },
    {
        label: "Total Revenue",
        render: (company: ICompanyIncomeStatement) => company.revenue,
    },
    {
        label: "Net Income",
        render: (company: ICompanyIncomeStatement) => company.netIncome,
    },
    {
        label: "Operating Expenses",
        render: (company: ICompanyIncomeStatement) => company.operatingExpenses,
    },
    {
        label: "Cost of Revenue",
        render: (company: ICompanyIncomeStatement) => company.netIncome,
    },
];

const IncomeStatement = ({}: IProps) => {
    const ticker = useOutletContext<string>();
    const [incomeStatement, setIncomeStatement] = useState<ICompanyIncomeStatement[]>();

    useEffect(() => {
        const fetchIncomeStatement = async () => {
            const result = await getIncomeStatement(ticker!);
            setIncomeStatement(result!.data);
        };
        fetchIncomeStatement();
    }, []);

    return (
        <>
            {incomeStatement ? (
                <Table config={configs} data={incomeStatement} />
            ) : (
                <h1>Could not find income statement.</h1>
            )}
        </>
    );
};

export default IncomeStatement;
