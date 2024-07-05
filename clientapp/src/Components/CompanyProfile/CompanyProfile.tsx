import { useOutletContext } from "react-router-dom";
import { ICompanyKeyMetrics } from "../../company";
import "./CompanyProfile.css";
import { useEffect, useState } from "react";
import { getKeyMetrics } from "../../api";
import RatioList from "../RatioList/RatioList";

interface IProps {}

const tableConfig = [
    {
        label: "Market Cap",
        render: (company: ICompanyKeyMetrics) => company.marketCapTTM,
    },
    {
        label: "Current Ratio",
        render: (company: ICompanyKeyMetrics) => company.currentRatioTTM,
    },
    {
        label: "Return On Equity",
        render: (company: ICompanyKeyMetrics) => company.roeTTM,
    },
    {
        label: "Cash Per Share",
        render: (company: ICompanyKeyMetrics) => company.cashPerShareTTM,
    },
    {
        label: "Current Ratio",
        render: (company: ICompanyKeyMetrics) => company.currentRatioTTM,
    },
    {
        label: "Return On Equity",
        render: (company: ICompanyKeyMetrics) => company.roeTTM,
    },
];

const CompanyProfile = ({}: IProps) => {
    const ticker = useOutletContext<string>();
    const [companyData, setCompanyData] = useState<ICompanyKeyMetrics>();

    useEffect(() => {
        const getCompanyKeyRatios = async () => {
            const value = await getKeyMetrics(ticker);
            setCompanyData(value?.data[0]);
        };
        getCompanyKeyRatios();
    }, []);

    return (
        <>
            {companyData ? (
                <>
                    <RatioList config={tableConfig} data={companyData} />
                </>
            ) : (
                <h1>No data found</h1>
            )}
        </>
    );
};

export default CompanyProfile;
