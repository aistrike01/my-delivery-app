import axios from "axios";
import qs from "qs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import ProductBlock from "../components/ProductBlock/ProductBlock";
import { Skeleton } from "../components/ProductBlock/Skeleton";
import Sort from "../components/Sort";
import { setFilters } from "../redux/slices/filterSlice";

const baseURL = "https://62ea80a63a5f1572e87d2d58.mockapi.io";

export default function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { searchValue, categoryId, sortId, sortTypesList, currentPage } = useSelector(
        (state) => state.filter
    );

    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const [isLoading, setIsLoading] = React.useState(true);
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        if (window.location.search) {
            let params = qs.parse(window.location.search.substring(1));
            params.sort = sortTypesList.findIndex(
                (obj) => obj.sortName === params.sort && obj.order === params.order
            );
            dispatch(setFilters(params));

            isSearch.current = true;
        }
    }, [dispatch, sortTypesList]);

    React.useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Cibus | Home";

        if (!isSearch.current) {
            const fetchProducts = () => {
                setIsLoading(true);

                const page = "page=" + currentPage;
                const sortBy = "&sortBy=" + sortTypesList[sortId].sortName;
                const order = "&order=" + sortTypesList[sortId].order;
                const categoryFilter = categoryId > 0 ? "&category=" + categoryId : "";
                const searchFilter = searchValue ? "&search=" + searchValue : "";
                axios
                    .get(
                        `${baseURL}/items?${page}&limit=4${sortBy}${order}${categoryFilter}${searchFilter}`
                    )
                    .then((r) => r.data)
                    .then((data) => handleProductLoad(data));
            };
            fetchProducts();
        }

        isSearch.current = false;
    }, [categoryId, sortId, searchValue, currentPage, sortTypesList]);

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sort: sortTypesList[sortId].sortName,
                order: sortTypesList[sortId].order,
                category: categoryId,
                page: currentPage,
            });

            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [navigate, categoryId, sortId, currentPage, sortTypesList]);

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
