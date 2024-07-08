import { useOutletContext } from "react-router-dom";
import { ICompanyBalanceSheet } from "../../company";
import "./BalanceSheet.css";
import { useEffect, useState } from "react";
import { getBalanceSheet } from "../../api";
import RatioList from "../RatioList/RatioList";
import Spinner from "../Spinner/Spinner";
import { formatLargeMonetaryNumber } from "../../Helpers/NumberFormatting";

interface IProps {}

const ratioListConfig = [
    {
        label: <div className="font-bold">Total Assets</div>,
        render: (company: ICompanyBalanceSheet) => formatLargeMonetaryNumber(company.totalAssets),
    },
    {
        label: "Current Assets",
        render: (company: ICompanyBalanceSheet) => formatLargeMonetaryNumber(company.totalCurrentAssets),
    },
    {
        label: "Total Cash",
        render: (company: ICompanyBalanceSheet) => formatLargeMonetaryNumber(company.cashAndCashEquivalents),
    },
    {
        label: "Property & equipment",
        render: (company: ICompanyBalanceSheet) => formatLargeMonetaryNumber(company.propertyPlantEquipmentNet),
    },
    {
        label: "Intangible Assets",
        render: (company: ICompanyBalanceSheet) => formatLargeMonetaryNumber(company.intangibleAssets),
    },
    {
        label: "Long Term Debt",
        render: (company: ICompanyBalanceSheet) => formatLargeMonetaryNumber(company.longTermDebt),
    },
    {
        label: "Total Debt",
        render: (company: ICompanyBalanceSheet) => formatLargeMonetaryNumber(company.otherCurrentLiabilities),
    },
    {
        label: <div className="font-bold">Total Liabilites</div>,
        render: (company: ICompanyBalanceSheet) => formatLargeMonetaryNumber(company.totalLiabilities),
    },
    {
        label: "Current Liabilities",
        render: (company: ICompanyBalanceSheet) => formatLargeMonetaryNumber(company.totalCurrentLiabilities),
    },
    {
        label: "Long-Term Debt",
        render: (company: ICompanyBalanceSheet) => formatLargeMonetaryNumber(company.longTermDebt),
    },
    {
        label: "Long-Term Income Taxes",
        render: (company: ICompanyBalanceSheet) => formatLargeMonetaryNumber(company.otherLiabilities),
    },
    {
        label: "Stakeholder's Equity",
        render: (company: ICompanyBalanceSheet) => formatLargeMonetaryNumber(company.totalStockholdersEquity),
    },
    {
        label: "Retained Earnings",
        render: (company: ICompanyBalanceSheet) => formatLargeMonetaryNumber(company.retainedEarnings),
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

    return <>{balanceSheet ? <RatioList config={ratioListConfig} data={balanceSheet} /> : <Spinner />}</>;
};

export default BalanceSheet;
