import { useOutletContext } from "react-router-dom";
import { ICompanyIncomeStatement } from "../../company";
import "./IncomeStatement.css";
import { useEffect, useState } from "react";
import { getIncomeStatement } from "../../api";
import Table from "../Table/Table";
import Spinner from "../Spinner/Spinner";

interface IProps {}

const configs = [
    {
        label: "Date",
        render: (company: ICompanyIncomeStatement) => company.date,
    },
    {
        label: "Revenue",
        render: (company: ICompanyIncomeStatement) => company.revenue,
    },
    {
        label: "Cost Of Revenue",
        render: (company: ICompanyIncomeStatement) => company.costOfRevenue,
    },
    {
        label: "Depreciation",
        render: (company: ICompanyIncomeStatement) => company.depreciationAndAmortization,
    },
    {
        label: "Operating Income",
        render: (company: ICompanyIncomeStatement) => company.operatingIncome,
    },
    {
        label: "Income Before Taxes",
        render: (company: ICompanyIncomeStatement) => company.incomeBeforeTax,
    },
    {
        label: "Net Income",
        render: (company: ICompanyIncomeStatement) => company.netIncome,
    },
    {
        label: "Net Income Ratio",
        render: (company: ICompanyIncomeStatement) => company.netIncomeRatio,
    },
    {
        label: "Earnings Per Share",
        render: (company: ICompanyIncomeStatement) => company.eps,
    },
    {
        label: "Earnings Per Diluted",
        render: (company: ICompanyIncomeStatement) => company.epsdiluted,
    },
    {
        label: "Gross Profit Ratio",
        render: (company: ICompanyIncomeStatement) => company.grossProfitRatio,
    },
    {
        label: "Opearting Income Ratio",
        render: (company: ICompanyIncomeStatement) => company.operatingIncomeRatio,
    },
    {
        label: "Income Before Taxes Ratio",
        render: (company: ICompanyIncomeStatement) => company.incomeBeforeTaxRatio,
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

    return <>{incomeStatement ? <Table config={configs} data={incomeStatement} /> : <Spinner />}</>;
};

export default IncomeStatement;
