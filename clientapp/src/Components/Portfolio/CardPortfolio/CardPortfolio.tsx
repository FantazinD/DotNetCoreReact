import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import { PortfolioGet } from "../../../Models/Portfolio";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./CardPortfolio.css";

interface IProps {
    portfolioValue: PortfolioGet;
    onPortfolioDelete: (stockSymbol: string) => void;
}

const CardPortfolio = ({ portfolioValue, onPortfolioDelete }: IProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const toggleDropdown = () => setIsDropdownOpen((prevState: boolean) => !prevState);

    const handleDeleteClick = () => {
        setIsDropdownOpen(false);
        setIsModalOpen(true);
    };

    const handleClickOutside = (event: any) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target as Node)
        ) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <div className="flex justify-end px-4 pt-4 relative z-0">
                <button
                    ref={buttonRef}
                    id="dropdownButton"
                    onClick={toggleDropdown}
                    className="inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
                    type="button"
                >
                    <span className="sr-only">Open dropdown</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 3"
                    >
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                </button>
                {isDropdownOpen && (
                    <div
                        ref={dropdownRef}
                        className="absolute top-12 z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
                    >
                        <ul className="py-2" aria-labelledby="dropdownButton">
                            <li>
                                <a
                                    onClick={handleDeleteClick}
                                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    Delete
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <Link
                to={`/company/${portfolioValue.symbol}/company-profile`}
                className="flex items-center justify-center w-full h-full pb-10 text-xl font-bold"
            >
                {portfolioValue.symbol}
            </Link>
            <ConfirmationModal
                isOpen={isModalOpen}
                onClickClose={() => {
                    setIsModalOpen(false);
                }}
                onClickConfirm={() => {
                    onPortfolioDelete(portfolioValue.symbol);
                }}
                content="Are you sure you want to delete this stock?"
            />
        </div>
    );
};

export default CardPortfolio;
