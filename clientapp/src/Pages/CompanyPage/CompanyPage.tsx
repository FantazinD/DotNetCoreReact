import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ICompanyProfile } from "../../company";
import { getCompanyProfile } from "../../api";

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

    return <>{company ? <div>{company.companyName}</div> : <div>Company not found!</div>}</>;
};

export default CompanyPage;
