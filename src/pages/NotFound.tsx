import React from "react";
import NotFoundBlock from "../components/NotFoundBlock";

const NotFound: React.FC = () => {
    React.useEffect(() => {
        document.title = "Cibus | 404";
    }, []);

    return (
        <div className="container">
            <NotFoundBlock />
        </div>
    );
};

export default NotFound;
