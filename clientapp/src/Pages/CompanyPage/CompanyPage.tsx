import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import TenKFinder from "../../Components/TenKFinder/TenKFinder";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Spinner from "../../Components/Spinner/Spinner";
import { ICompanyProfile } from "../../company";
import Tile from "../../Components/Tile/Tile";
import { getCompanyProfile } from "../../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

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
                <div className="flex w-full relative justify-center items-center min-h-screen">
                    <Sidebar />
                    <CompanyDashboard ticker={ticker!}>
                        <Tile title="Company Name" content={company.companyName} />
                        <Tile title="Price" content={`$${company.price}`} />
                        <Tile title="DCF" content={`$${company.dcf}`} />
                        <Tile title="Sector" content={company.sector} />
                        <TenKFinder ticker={company.symbol} />
                    </CompanyDashboard>
                </div>
            ) : (
                <Spinner />
            )}
        </>
    );
};

export default CompanyPage;
