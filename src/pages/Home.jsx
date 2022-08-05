import React from "react";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import ProductBlock from "../components/ProductBlock/ProductBlock";
import { Skeleton } from "../components/ProductBlock/Skeleton";
import Sort from "../components/Sort";

const baseURL = "https://62ea80a63a5f1572e87d2d58.mockapi.io";
const sortTypes = [
    { name: "популярности (DESC)", sortName: "rating", order: "desc" },
    { name: "популярности (ASC)", sortName: "rating", order: "asc" },
    { name: "цене (DESC)", sortName: "price", order: "desc" },
    { name: "цене (ASC)", sortName: "price", order: "asc" },
    { name: "алфавиту (DESC)", sortName: "title", order: "desc" },
    { name: "алфавиту (ASC)", sortName: "title", order: "asc" },
];

export default function Home({ searchValue }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [products, setProducts] = React.useState([]);
    const [sortType, setSortType] = React.useState(0);
    const [category, setCategory] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);

    React.useEffect(() => {
        setIsLoading(true);

        const page = "page=" + currentPage;
        const sortBy = "&sortBy=" + sortTypes[sortType].sortName;
        const order = "&order=" + sortTypes[sortType].order;
        const categoryFilter = category > 0 ? "&category=" + category : "";
        const searchFilter = searchValue ? "&search=" + searchValue : "";

        fetch(`${baseURL}/items?${page}&limit=4${sortBy}${order}${categoryFilter}${searchFilter}`)
            .then((r) => r.json())
            .then((data) => handleProductLoad(data));
    }, [category, sortType, searchValue, currentPage]);

    const filterProducts = products.filter((product) =>
        product.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ? true : false
    );
    const productsBlocks = filterProducts.map((item) => <ProductBlock key={item.id} {...item} />);
    const productsSkeleton = [...new Array(9)].map((_, index) => <Skeleton key={index} />);

    function handleProductLoad(data) {
        setProducts(data);
        setIsLoading(false);
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories category={category} setCategory={(i) => setCategory(i)} />
                <Sort sortTypes={sortTypes} sortType={sortType} setSortType={setSortType} />
            </div>
            <h2 className="content__title">Все продукты</h2>
            <div className="content__items">{isLoading ? productsSkeleton : productsBlocks}</div>
            <Pagination onPageChange={(number) => setCurrentPage(number)} />
        </div>
    );
}
