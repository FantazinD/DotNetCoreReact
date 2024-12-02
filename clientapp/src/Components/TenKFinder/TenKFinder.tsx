import { getTenK } from "../../api";
import { ICompanyTenK } from "../../company";
import "./TenKFinder.css";
import { useEffect, useState } from "react";
import TenKFinderItem from "./TenKFinderItem/TenKFinderItem";
import Spinner from "../Spinner/Spinner";
import { v4 as uuidv4 } from "uuid";

interface IProps {
    ticker: string;
}

const TenKFinder = ({ ticker }: IProps) => {
    const [companyData, setCompanyData] = useState<ICompanyTenK[]>([]);

    useEffect(() => {
        const fetchTenKData = async () => {
            const result = await getTenK(ticker);
            setCompanyData(result?.data || []);
        };
        fetchTenKData();
    }, [ticker]);

    return (
        <div className="inline-flex rounded-md shadow-sm m-4 gap-2" role="group">
            {companyData ? (
                companyData?.slice(0, 5).map((companyDatum: ICompanyTenK) => {
                    return <TenKFinderItem key={uuidv4()} tenK={companyDatum} />;
                })
            ) : (
                <Spinner />
            )}
        </div>
    );
};

export default TenKFinder;
