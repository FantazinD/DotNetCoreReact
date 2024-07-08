import { useOutletContext } from "react-router-dom";
import { ICompanyKeyMetrics } from "../../company";
import "./CompanyProfile.css";
import { useEffect, useState } from "react";
import { getKeyMetrics } from "../../api";
import RatioList from "../RatioList/RatioList";
import Spinner from "../Spinner/Spinner";

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
        const fetchCompanyKeyRatios = async () => {
            const result = await getKeyMetrics(ticker);
            setCompanyData(result?.data[0]);
        };
        fetchCompanyKeyRatios();
    }, []);

    return (
        <>
            {companyData ? (
                <>
                    <RatioList config={tableConfig} data={companyData} />
                </>
            ) : (
                <Spinner />
            )}
        </>
    );
};

export default CompanyProfile;
