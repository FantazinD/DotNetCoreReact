import React, { ChangeEvent, SyntheticEvent } from "react";
import "./Search.css";

interface Props {
    isLoading: boolean;
    search: string | undefined;
    onSearchSubmit: (e: SyntheticEvent) => void;
    handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<Props> = ({ search, isLoading, onSearchSubmit, handleSearchChange }: Props): JSX.Element => {
    return (
        <section className="relative bg-gray-100">
            <div className="max-w-4xl mx-auto p-6 space-y-6 ">
                <div className="w-full p-10 space-y-4 bg-darkBlue rounded-lg md:space-y-0 md:space-x-3 relative z-0">
                    <form className="max-w-md mx-auto" onSubmit={onSearchSubmit}>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
                            Search
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="default-search"
                                value={search}
                                onChange={handleSearchChange}
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Search Companies..."
                                required
                            />
                            <button
                                type="submit"
                                className="text-white absolute end-2.5 bottom-2.5 bg-lightBlue hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                    {isLoading && (
                        <div
                            className="absolute left-0 top-[-16px] md:left-[-12px] md:top-0 z-10 w-full"
                            id="progressBarSearch"
                        >
                            <div className="h-1.5 w-full bg-teal-100 overflow-hidden rounded-t-lg">
                                <div className="animate-progress w-full h-full bg-lightGreen origin-left-right"></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );

    // return (
    //     <section className="relative bg-gray-100">
    //         <div className="max-w-4xl mx-auto p-6 space-y-6 ">
    //             <form
    //                 className="form relative flex flex-col w-full p-10 space-y-4 bg-darkBlue rounded-lg md:flex-row md:space-y-0 md:space-x-3 relative z-0"
    //                 onSubmit={onSearchSubmit}
    //             >

    //             </form>
    //         </div>
    //     </section>
    // );
};

export default Search;
