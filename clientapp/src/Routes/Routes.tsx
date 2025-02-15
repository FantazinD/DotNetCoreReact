import HistoricalDividend from "../Components/HistoricalDividend/HistoricalDividend";
import CashFlowStatement from "../Components/CashFlowStatement/CashFlowStatement";
import IncomeStatement from "../Components/IncomeStatement/IncomeStatement";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import BalanceSheet from "../Components/BalanceSheet/BalanceSheet";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import DesignPage from "../Pages/DesignPage/DesignPage";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../Pages/LoginPage/LoginPage";
import HomePage from "../Pages/HomePage/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import App from "../App";

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
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "register",
                element: <RegisterPage />,
            },
            {
                path: "design-guide",
                element: <DesignPage />,
            },
            {
                path: "search",
                element: (
                    <ProtectedRoute>
                        <SearchPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "company/:ticker",
                element: (
                    <ProtectedRoute>
                        <CompanyPage />
                    </ProtectedRoute>
                ),
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
