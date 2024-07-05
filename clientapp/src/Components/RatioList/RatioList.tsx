import { TestDataCompany } from "../Table/testData";
import "./RatioList.css";
import React from "react";

interface IProps {}

const data = TestDataCompany[0];

type Company = typeof data;

const config = [
    {
        label: "Company Name",
        render: (company: Company) => company.companyName,
        description: "This is a company name",
    },
];

const RatioList = ({}: IProps) => {
    const renderedRows = config.map((row) => {
        return (
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{row.label}</p>
                        <p className="text-sm text-gray-500 truncate">{row.description && row.description}</p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                        {row.render(data)}
                    </div>
                </div>
            </li>
        );
    });

    return (
        <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
            <ul className="divide-y divided-gray-200">{renderedRows}</ul>
        </div>
    );
};

export default RatioList;
