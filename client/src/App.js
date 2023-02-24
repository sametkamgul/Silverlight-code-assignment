import React from "react";
import {
    BrowserRouter as Router,
    useRoutes,
} from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import Home from "./pages/HomePage";

const App = () => {
    let routes = useRoutes([
        { path: "/", element: <Home /> },
        { path: "/result", element: <DetailPage />},
    ]);
    return routes;
};

const AppWrapper = () => {
    return (
        <Router>
            <App />
        </Router>
    );
};

export default AppWrapper;
