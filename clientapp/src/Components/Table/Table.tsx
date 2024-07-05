import "./Table.css";

interface IProps {
    config: any;
    data: any;
}

const Table = ({ config, data }: IProps) => {
    const renderedRows = data.map((company: any) => {
        return (
            <tr key={company.cik}>
                {config.map((val: any) => {
                    return <td className="p-3">{val.render(company)}</td>;
                })}
            </tr>
        );
    });

    const renderedHeaders = config.map((config: any) => {
        return (
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" key={config.label}>
                {config.label}
            </th>
        );
    });

    return (
        <div className="bg-white shadow rounded-lg ml-4 mt-4 mb-4 p-4 sm:p-6 h-full">
            <table className="min-w-full divide-y divide-gray-200 m-5">
                <thead className="bg-gray-50">{renderedHeaders}</thead>
                <tbody>{renderedRows}</tbody>
            </table>
        </div>
    );
};

export default Table;
