import { ICompanyTenK } from "../../../company";
import { Link } from "react-router-dom";
import "./TenKFinderItem.css";

interface IProps {
    tenK: ICompanyTenK;
}

const TenKFinderItem = ({ tenK }: IProps) => {
    const fillingDate = new Date(tenK.fillingDate).getFullYear();

    return (
        <Link
            target="_blank"
            reloadDocument
            to={tenK.finalLink}
            type="button"
            className="inline-flex items-center p-4 text-md text-white bg-lightGreen rounded-md"
        >
            {` 10K - ${tenK.symbol} - ${fillingDate} `}
        </Link>
    );
};

export default TenKFinderItem;
