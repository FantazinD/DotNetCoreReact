import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import App from "../App";
import SearchPage from "../Pages/SearchPage/SearchPage";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import IncomeStatement from "../Components/IncomeStatement/IncomeStatement";
import DesignPage from "../Pages/DesignPage/DesignPage";
import BalanceSheet from "../Components/BalanceSheet/BalanceSheet";
import HistoricalDividend from "../Components/HistoricalDividend/HistoricalDividend";
import CashFlowStatement from "../Components/CashFlowStatement/CashflowStatement";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "design-guide",
                element: <DesignPage />,
            },
            {
                path: "search",
                element: <SearchPage />,
            },
            {
                path: "company/:ticker",
                element: <CompanyPage />,
                children: [
                    {
                        path: "company-profile",
                        element: <CompanyProfile />,
                    },
                    {
                        path: "income-statement",
                        element: <IncomeStatement />,
                    },
                    {
                        path: "balance-sheet",
                        element: <BalanceSheet />,
                    },
                    {
                        path: "cashflow-statement",
                        element: <CashFlowStatement />,
                    },
                    {
                        path: "historical-dividend",
                        element: <HistoricalDividend />,
                    },
                ],
            },
        ],
    },
]);
