import React from "react";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import ProductBlock from "../components/ProductBlock/ProductBlock";
import { Skeleton } from "../components/ProductBlock/Skeleton";
import Sort from "../components/Sort";
import { selectSearchValue } from "../redux/slices/searchSlice";
import { useSelector } from "react-redux";
import { selectCategoryValue } from "../redux/slices/categoriesSlice";
import { selectSortTypes } from "../redux/slices/sortSlice";
import { selectSortValue } from "../redux/slices/sortSlice";

const baseURL = "https://62ea80a63a5f1572e87d2d58.mockapi.io";

export default function Home() {
    const category = useSelector(selectCategoryValue);
    const sortTypes = useSelector(selectSortTypes);
    const searchValue = useSelector(selectSearchValue);
    const sortType = useSelector(selectSortValue);

    const [isLoading, setIsLoading] = React.useState(true);
    const [products, setProducts] = React.useState([]);
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
    }, [category, sortType, searchValue, currentPage, sortTypes]);

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
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все продукты</h2>
            <div className="content__items">{isLoading ? productsSkeleton : productsBlocks}</div>
            <Pagination onPageChange={(number) => setCurrentPage(number)} />
        </div>
    );
}
