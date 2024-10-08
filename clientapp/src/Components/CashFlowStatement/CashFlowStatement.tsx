import { useOutletContext } from "react-router-dom";
import { ICompanyCashFlow } from "../../company";
import "./CashFlowStatement.css";
import { useEffect, useState } from "react";
import { getCashFlow } from "../../api";
import Table from "../Table/Table";
import Spinner from "../Spinner/Spinner";
import { formatLargeMonetaryNumber } from "../../Helpers/NumberFormatting";

interface IProps {}

const tableConfig = [
    {
        label: "Date",
        render: (company: ICompanyCashFlow) => company.date,
    },
    {
        label: "Operating Cashflow",
        render: (company: ICompanyCashFlow) => formatLargeMonetaryNumber(company.operatingCashFlow),
    },
    {
        label: "Investing Cashflow",
        render: (company: ICompanyCashFlow) => formatLargeMonetaryNumber(company.netCashUsedForInvestingActivites),
    },
    {
        label: "Financing Cashflow",
        render: (company: ICompanyCashFlow) =>
            formatLargeMonetaryNumber(company.netCashUsedProvidedByFinancingActivities),
    },
    {
        label: "Cash At End of Period",
        render: (company: ICompanyCashFlow) => formatLargeMonetaryNumber(company.cashAtEndOfPeriod),
    },
    {
        label: "CapEX",
        render: (company: ICompanyCashFlow) => formatLargeMonetaryNumber(company.capitalExpenditure),
    },
    {
        label: "Issuance Of Stock",
        render: (company: ICompanyCashFlow) => formatLargeMonetaryNumber(company.commonStockIssued),
    },
    {
        label: "Free Cash Flow",
        render: (company: ICompanyCashFlow) => formatLargeMonetaryNumber(company.freeCashFlow),
    },
];

const CashFlowStatement = ({}: IProps) => {
    const ticker = useOutletContext<string>();
    const [cashFlowData, setCashFlowData] = useState<ICompanyCashFlow[]>([]);

    useEffect(() => {
        const fetchCashFlow = async () => {
            const result = await getCashFlow(ticker);
            setCashFlowData(result!.data);
        };
        fetchCashFlow();
    }, []);

    return cashFlowData ? <Table config={tableConfig} data={cashFlowData}></Table> : <Spinner />;
};

export default CashFlowStatement;
