import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import ProductBlock from "../components/ProductBlock/ProductBlock";
import { Skeleton } from "../components/ProductBlock/Skeleton";
import Sort from "../components/Sort";
import { selectSearchValue } from "../redux/slices/searchSlice";

const baseURL = "https://62ea80a63a5f1572e87d2d58.mockapi.io";

export default function Home() {
    const {
        categoryId: category,
        sortType,
        sortTypes,
        pageCount: currentPage,
    } = useSelector((state) => state.filter);
    const searchValue = useSelector(selectSearchValue);
    const [isLoading, setIsLoading] = React.useState(true);
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        setIsLoading(true);

        const page = "page=" + currentPage;
        const sortBy = "&sortBy=" + sortTypes[sortType].sortName;
        const order = "&order=" + sortTypes[sortType].order;
        const categoryFilter = category > 0 ? "&category=" + category : "";
        const searchFilter = searchValue ? "&search=" + searchValue : "";
        axios
            .get(
                `${baseURL}/items?${page}&limit=4${sortBy}${order}${categoryFilter}${searchFilter}`
            )
            .then((r) => r.data)
            .then((data) => handleProductLoad(data));
    }, [category, sortType, searchValue, currentPage, sortTypes]);

    const filterProducts = products.filter((product) =>
        product.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ? true : false
    );
    const productsBlocks = filterProducts.map((item) => <ProductBlock key={item.id} {...item} />);
    const productsSkeleton = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

    function handleProductLoad(data) {
        setProducts(data);
        setIsLoading(false);
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все продукты</h2>
            <div className="content__items">{isLoading ? productsSkeleton : productsBlocks}</div>
            <Pagination />
        </div>
    );
}
