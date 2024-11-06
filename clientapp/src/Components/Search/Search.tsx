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
                <form
                    className="form relative flex flex-col w-full p-10 space-y-4 bg-darkBlue rounded-lg md:flex-row md:space-y-0 md:space-x-3 relative z-0"
                    onSubmit={onSearchSubmit}
                >
                    {isLoading && (
                        <>
                            <div className="absolute left-0 top-0 z-10 w-full" id="progressBarSearch">
                                <div className="h-1.5 w-full bg-teal-100 overflow-hidden rounded-t-lg">
                                    <div className="animate-progress w-full h-full bg-lightGreen origin-left-right"></div>
                                </div>
                            </div>
                        </>
                    )}
                    <input
                        className="flex-1 p-3 border-2 rounded-lg placeholder-black focus:outline-none"
                        id="search-input"
                        placeholder="Search companies"
                        value={search}
                        onChange={handleSearchChange}
                    ></input>
                </form>
            </div>
        </section>
    );
};

export default Search;
