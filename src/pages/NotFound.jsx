import React from "react";
import NotFoundBlock from "../components/NotFoundBlock";

export default function NotFound() {
    React.useEffect(() => {
        document.title = "Cibus | 404";
    }, []);

    return (
        <div className="container">
            <NotFoundBlock />
        </div>
    );
}
