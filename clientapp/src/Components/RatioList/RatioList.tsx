import { v4 as uuidv4 } from "uuid";
import "./RatioList.css";

interface IProps {
    config: any;
    data: any;
}

const RatioList = ({ config, data }: IProps) => {
    const renderedRows = config.map((row: any) => {
        return (
            <li key={uuidv4()} className="py-6">
                <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{row.label}</p>
                        <p className="text-sm text-gray-500 truncate">
                            <a
                                href="/cdn-cgi/l/email-protection"
                                className="__cf_email__"
                                data-cfemail="17727a767e7b57607e7973646372653974787a"
                            >
                                {row.subTitle && row.subTitle}
                            </a>
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                        {row.render(data)}
                    </div>
                </div>
            </li>
        );
    });

    return (
        <div className="bg-white shadow rounded-lg m-4 p-4 sm:p-6 h-full w-full">
            <ul className="divide-y divided-gray-200">{renderedRows}</ul>
        </div>
    );
};

export default RatioList;
