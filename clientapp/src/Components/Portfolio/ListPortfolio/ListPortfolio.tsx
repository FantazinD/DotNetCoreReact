import { SyntheticEvent } from "react";
import "./ListPortfolio.css";
import CardPortfolio from "../CardPortfolio/CardPortfolio";
import { PortfolioGet } from "../../../Models/Portfolio";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../../Spinner/Spinner";

interface IProps {
    portfolioValues: PortfolioGet[] | null;
    onPortfolioDelete: (stockSymbol: string) => void;
}

const ListPortfolio = ({ portfolioValues, onPortfolioDelete }: IProps) => {
    return (
        <section id="portfolio" className=" relative z-0">
            <h2 className="mb-3 mt-3 text-3xl font-semibold text-center md:text-4xl">My Portfolio</h2>
            <div className="relative flex flex-col items-center max-w-5xl mx-auto space-y-10 px-10 mb-5 md:px-6 md:space-y-0 md:space-x-7 md:flex-row">
                {portfolioValues && portfolioValues.length > 0 ? (
                    portfolioValues.map((portfolioValue) => {
                        return (
                            <CardPortfolio
                                key={uuidv4()}
                                portfolioValue={portfolioValue}
                                onPortfolioDelete={onPortfolioDelete}
                            />
                        );
                    })
                ) : portfolioValues && portfolioValues.length === 0 ? (
                    <h3 className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">Your portfolio is empty.</h3>
                ) : (
                    <div className="fixed inset-0 bg-gray-500 opacity-20 z-20"></div> /* Overlay */
                )}
            </div>
            <Spinner isLoading={portfolioValues === null} />
        </section>
    );
};

export default ListPortfolio;
