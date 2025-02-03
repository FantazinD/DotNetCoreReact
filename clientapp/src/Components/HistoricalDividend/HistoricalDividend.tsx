import SimpleLineChart from "../SimpleLineChart/SimpleLineChart";
import { useOutletContext } from "react-router-dom";
import { getHistoricalDividend } from "../../api";
import { useEffect, useState } from "react";
import { IDividend } from "../../company";
import Spinner from "../Spinner/Spinner";
import "./HistoricalDividend.css";

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
