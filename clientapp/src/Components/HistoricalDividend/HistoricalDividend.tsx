import { useOutletContext } from "react-router-dom";
import "./HistoricalDividend.css";
import React, { useEffect, useState } from "react";
import SimpleLineChart from "../SimpleLineChart/SimpleLineChart";
import { IDividend } from "../../company";
import { getHistoricalDividend } from "../../api";
import Spinner from "../Spinner/Spinner";

interface IProps {}

const HistoricalDividend = ({}: IProps) => {
    const ticker = useOutletContext<string>();
    const [dividend, setDividend] = useState<IDividend[]>();

    useEffect(() => {
        const fetchHistoricalDividend = async () => {
            const result = await getHistoricalDividend(ticker);
            setDividend(
                result?.data.historical.slice(0, 18).sort(function (a, b) {
                    var c = new Date(a.date);
                    var d = new Date(b.date);
                    return c.getTime() - d.getTime();
                })
            );
        };
        fetchHistoricalDividend();
    }, []);

    return (
        <>
            {dividend && dividend.length > 0 && dividend !== undefined ? (
                <SimpleLineChart data={dividend} xAxis="label" dataKey="dividend" />
            ) : (
                <Spinner />
            )}
        </>
    );
};

export default HistoricalDividend;
