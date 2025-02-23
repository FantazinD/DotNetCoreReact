import { UserProvider } from "./Context/useAuth";
import { ToastContainer } from "react-toastify";
import Navbar from "./Components/Navbar/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router";
import "./App.css";

function App() {
    return (
        <>
            <UserProvider>
                <Navbar />
                <Outlet />
                <ToastContainer />
            </UserProvider>
        </>
    );
}

export default App;
