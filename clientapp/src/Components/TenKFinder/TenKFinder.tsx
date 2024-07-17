import { getTenK } from "../../api";
import { ICompanyTenK } from "../../company";
import "./TenKFinder.css";
import React, { useEffect, useState } from "react";
import TenKFinderItem from "./TenKFinderItem/TenKFinderItem";
import Spinner from "../Spinner/Spinner";

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
        <div className="inline-flex rounded-md shadow-sm m-4" role="group">
            {companyData ? (
                companyData?.slice(0, 5).map((companyDatum: ICompanyTenK) => {
                    return (
                        <TenKFinderItem
                            key={`${companyDatum.symbol}-${companyDatum.fillingDate}`}
                            tenK={companyDatum}
                        />
                    );
                })
            ) : (
                <Spinner />
            )}
        </div>
    );
};

export default TenKFinder;
