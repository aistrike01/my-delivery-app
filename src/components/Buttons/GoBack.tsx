import { Link } from "react-router-dom";

export const GoBack = () => {
    return (
        <div>
            <Link to="/" className="button button--black">
                <span>Вернуться назад</span>
            </Link>
        </div>
    );
};
