import { useOutletContext } from "react-router-dom";
import { ICompanyBalanceSheet } from "../../company";
import "./BalanceSheet.css";
import { useEffect, useState } from "react";
import { getBalanceSheet } from "../../api";
import RatioList from "../RatioList/RatioList";
import Spinner from "../Spinner/Spinner";

interface IProps {}

const config = [
    {
        label: <div className="font-bold">Total Assets</div>,
        render: (company: ICompanyBalanceSheet) => company.totalAssets,
    },
    {
        label: "Current Assets",
        render: (company: ICompanyBalanceSheet) => company.totalCurrentAssets,
    },
    {
        label: "Total Cash",
        render: (company: ICompanyBalanceSheet) => company.cashAndCashEquivalents,
    },
    {
        label: "Property & equipment",
        render: (company: ICompanyBalanceSheet) => company.propertyPlantEquipmentNet,
    },
    {
        label: "Intangible Assets",
        render: (company: ICompanyBalanceSheet) => company.intangibleAssets,
    },
    {
        label: "Long Term Debt",
        render: (company: ICompanyBalanceSheet) => company.longTermDebt,
    },
    {
        label: "Total Debt",
        render: (company: ICompanyBalanceSheet) => company.otherCurrentLiabilities,
    },
    {
        label: <div className="font-bold">Total Liabilites</div>,
        render: (company: ICompanyBalanceSheet) => company.totalLiabilities,
    },
    {
        label: "Current Liabilities",
        render: (company: ICompanyBalanceSheet) => company.totalCurrentLiabilities,
    },
    {
        label: "Long-Term Debt",
        render: (company: ICompanyBalanceSheet) => company.longTermDebt,
    },
    {
        label: "Long-Term Income Taxes",
        render: (company: ICompanyBalanceSheet) => company.otherLiabilities,
    },
    {
        label: "Stakeholder's Equity",
        render: (company: ICompanyBalanceSheet) => company.totalStockholdersEquity,
    },
    {
        label: "Retained Earnings",
        render: (company: ICompanyBalanceSheet) => company.retainedEarnings,
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

    return <>{balanceSheet ? <RatioList config={config} data={balanceSheet} /> : <Spinner />}</>;
};

export default BalanceSheet;
