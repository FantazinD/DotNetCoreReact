import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ICompanyProfile } from "../../company";
import { getCompanyProfile } from "../../api";
import Sidebar from "../../Components/Sidebar/Sidebar";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Tile from "../../Components/Tile/Tile";

interface IProps {}

const CompanyPage = ({}: IProps) => {
    let { ticker } = useParams();

    const [company, setCompany] = useState<ICompanyProfile>();

    useEffect(() => {
        const getProfileInit = async () => {
            const result = await getCompanyProfile(ticker!);
            setCompany(result?.data[0]);
        };
        getProfileInit();
    }, []);

    return (
        <>
            {company ? (
                <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
                    <Sidebar />
                    <CompanyDashboard ticker={ticker!}>
                        <Tile title="Company Name" content={company.companyName} />
                    </CompanyDashboard>
                </div>
            ) : (
                <div>Company Not Found!</div>
            )}
        </>
    );
};

export default CompanyPage;
