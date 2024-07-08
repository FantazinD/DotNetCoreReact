import { useOutletContext } from "react-router-dom";
import { ICompanyIncomeStatement } from "../../company";
import "./IncomeStatement.css";
import { useEffect, useState } from "react";
import { getIncomeStatement } from "../../api";
import Table from "../Table/Table";
import Spinner from "../Spinner/Spinner";
import { formatLargeMonetaryNumber, formatRatio } from "../../Helpers/NumberFormatting";

interface IProps {}

const tableConfig = [
    {
        label: "Date",
        render: (company: ICompanyIncomeStatement) => company.date,
    },
    {
        label: "Revenue",
        render: (company: ICompanyIncomeStatement) => formatLargeMonetaryNumber(company.revenue),
    },
    {
        label: "Cost Of Revenue",
        render: (company: ICompanyIncomeStatement) => formatLargeMonetaryNumber(company.costOfRevenue),
    },
    {
        label: "Depreciation",
        render: (company: ICompanyIncomeStatement) => formatLargeMonetaryNumber(company.depreciationAndAmortization),
    },
    {
        label: "Operating Income",
        render: (company: ICompanyIncomeStatement) => formatLargeMonetaryNumber(company.operatingIncome),
    },
    {
        label: "Income Before Taxes",
        render: (company: ICompanyIncomeStatement) => formatLargeMonetaryNumber(company.incomeBeforeTax),
    },
    {
        label: "Net Income",
        render: (company: ICompanyIncomeStatement) => formatLargeMonetaryNumber(company.netIncome),
    },
    {
        label: "Net Income Ratio",
        render: (company: ICompanyIncomeStatement) => formatRatio(company.netIncomeRatio),
    },
    {
        label: "Earnings Per Share",
        render: (company: ICompanyIncomeStatement) => formatRatio(company.eps),
    },
    {
        label: "Earnings Per Diluted",
        render: (company: ICompanyIncomeStatement) => formatRatio(company.epsdiluted),
    },
    {
        label: "Gross Profit Ratio",
        render: (company: ICompanyIncomeStatement) => formatRatio(company.grossProfitRatio),
    },
    {
        label: "Opearting Income Ratio",
        render: (company: ICompanyIncomeStatement) => formatRatio(company.operatingIncomeRatio),
    },
    {
        label: "Income Before Taxes Ratio",
        render: (company: ICompanyIncomeStatement) => formatRatio(company.incomeBeforeTaxRatio),
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

    return <>{incomeStatement ? <Table config={tableConfig} data={incomeStatement} /> : <Spinner />}</>;
};

export default IncomeStatement;
