import { useOutletContext } from "react-router-dom";
import { ICompanyBalanceSheet } from "../../company";
import "./BalanceSheet.css";
import { useEffect, useState } from "react";
import { getBalanceSheet } from "../../api";
import RatioList from "../RatioList/RatioList";

interface IProps {}

const config = [
    {
        label: "Cash",
        render: (company: ICompanyBalanceSheet) => company.cashAndCashEquivalents,
    },
    {
        label: "Inventory",
        render: (company: ICompanyBalanceSheet) => company.inventory,
    },
    {
        label: "Other Current Assets",
        render: (company: ICompanyBalanceSheet) => company.otherCurrentAssets,
    },
    {
        label: "Minority Interest",
        render: (company: ICompanyBalanceSheet) => company.minorityInterest,
    },
    {
        label: "Other Non-Current Assets",
        render: (company: ICompanyBalanceSheet) => company.otherNonCurrentAssets,
    },
    {
        label: "Long Term Debt",
        render: (company: ICompanyBalanceSheet) => company.longTermDebt,
    },
    {
        label: "Total Debt",
        render: (company: ICompanyBalanceSheet) => company.otherCurrentLiabilities,
    },
];

const BalanceSheet = ({}: IProps) => {
    const ticker = useOutletContext<string>();
    const [balanceSheet, setBalanceSheet] = useState<ICompanyBalanceSheet>();

    useEffect(() => {
        const fetchBalanceSheet = async () => {
            const result = await getBalanceSheet(ticker!);
            setBalanceSheet(result?.data[0]);
        };
        fetchBalanceSheet();
    }, []);

    return <>{balanceSheet ? <RatioList config={config} data={balanceSheet} /> : <h1>Company not found</h1>}</>;
};

export default BalanceSheet;
