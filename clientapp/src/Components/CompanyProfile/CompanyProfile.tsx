import { useOutletContext } from "react-router-dom";
import { ICompanyKeyMetrics } from "../../company";
import "./CompanyProfile.css";
import { useEffect, useState } from "react";
import { getKeyMetrics } from "../../api";
import RatioList from "../RatioList/RatioList";
import Spinner from "../Spinner/Spinner";
import { formatLargeNonMonetaryNumber, formatRatio } from "../../Helpers/NumberFormatting";
import StockComment from "../StockComment/StockComment";

interface IProps {}

const tableConfig = [
    {
        label: "Market Cap",
        render: (company: ICompanyKeyMetrics) => formatLargeNonMonetaryNumber(company.marketCapTTM),
        subTitle: "Total value of all a company's shares of stock",
    },
    {
        label: "Current Ratio",
        render: (company: ICompanyKeyMetrics) => formatRatio(company.currentRatioTTM),
        subTitle: "Measures the companies ability to pay short term debt obligations",
    },
    {
        label: "Return On Equity",
        render: (company: ICompanyKeyMetrics) => formatRatio(company.roeTTM),
        subTitle: "Return on equity is the measure of a company's net income divided by its shareholder's equity",
    },
    {
        label: "Return On Assets",
        render: (company: ICompanyKeyMetrics) => formatRatio(company.returnOnTangibleAssetsTTM),
        subTitle: "Return on assets is the measure of how effective a company is using its assets",
    },
    {
        label: "Free Cashflow Per Share",
        render: (company: ICompanyKeyMetrics) => formatRatio(company.freeCashFlowPerShareTTM),
        subTitle: "Return on assets is the measure of how effective a company is using its assets",
    },
    {
        label: "Book Value Per Share TTM",
        render: (company: ICompanyKeyMetrics) => formatRatio(company.bookValuePerShareTTM),
        subTitle:
            "Book value per share indicates a firm's net asset value (total assets - total liabilities) on per share basis",
    },
    {
        label: "Divdend Yield TTM",
        render: (company: ICompanyKeyMetrics) => formatRatio(company.dividendYieldTTM),
        subTitle: "Shows how much a company pays each year relative to stock price",
    },
    {
        label: "Capex Per Share TTM",
        render: (company: ICompanyKeyMetrics) => formatRatio(company.capexPerShareTTM),
        subTitle: "Capex is used by a company to aquire, upgrade, and maintain physical assets",
    },
    {
        label: "Graham Number",
        render: (company: ICompanyKeyMetrics) => formatRatio(company.grahamNumberTTM),
        subTitle: "This is the upperbouind of the price range that a defensive investor should pay for a stock",
    },
    {
        label: "PE Ratio",
        render: (company: ICompanyKeyMetrics) => formatRatio(company.peRatioTTM),
        subTitle: "This is the upperbouind of the price range that a defensive investor should pay for a stock",
    },
];

const CompanyProfile = ({}: IProps) => {
    const ticker = useOutletContext<string>();
    const [companyData, setCompanyData] = useState<ICompanyKeyMetrics>();

    useEffect(() => {
        const fetchCompanyKeyRatios = async () => {
            const result = await getKeyMetrics(ticker);
            setCompanyData(result?.data[0]);
        };
        fetchCompanyKeyRatios();
    }, []);

    return (
        <>
            {companyData ? (
                <div>
                    <RatioList config={tableConfig} data={companyData} />
                    <StockComment stockSymbol={ticker} />
                </div>
            ) : (
                <Spinner />
            )}
        </>
    );
};

export default CompanyProfile;
