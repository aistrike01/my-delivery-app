import qs from "qs";
import React from "react";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import ProductBlock from "../components/ProductBlock/ProductBlock";
import Skeleton from "../components/ProductBlock/Skeleton";
import Sort from "../components/Sort";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IFilters, ISortType, selectFilter, setFilters } from "../store/slices/filterSlice";
import { fetchProducts, IProduct, selectProduct } from "../store/slices/productSlice";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { searchValue, categoryId, categoriesList, sortId, sortTypesList, currentPage } =
        useAppSelector(selectFilter);
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const { items: products, status } = useAppSelector(selectProduct);

    React.useEffect(() => {
        if (window.location.search) {
            let params = qs.parse(window.location.search.substring(1));

            if (params.sort && params.order) {
                let paramsSort = sortTypesList.findIndex(
                    (obj: ISortType) => obj.sortName === params.sort && obj.order === params.order
                );

                let filters = { ...params, sort: paramsSort };
                dispatch(setFilters(filters as IFilters));
            }

            isSearch.current = true;
        }
    }, [dispatch, sortTypesList]);

    React.useEffect(() => {
        document.title = "Cibus | Home";

        const getProducts = async () => {
            const page = "page=" + currentPage;
            const sortBy = "&sortBy=" + sortTypesList[sortId].sortName;
            const order = "&order=" + sortTypesList[sortId].order;
            const categoryFilter = categoryId > 0 ? "&category=" + categoryId : "";
            const searchFilter = searchValue ? "&search=" + searchValue : "";

            dispatch(fetchProducts({ page, sortBy, order, categoryFilter, searchFilter }));
        };

        getProducts();
        window.scrollTo(0, 0);

        isSearch.current = false;
    }, [categoryId, sortId, searchValue, currentPage, sortTypesList, dispatch]);

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

    const filterProducts = products.filter((product: IProduct) =>
        product.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ? true : false
    );
    const productsBlocks = filterProducts.map((item: IProduct) => (
        <ProductBlock key={item.id} {...item} />
    ));
    const productsSkeleton = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId} categoriesList={categoriesList} />
                <Sort sortId={sortId} sortTypes={sortTypesList} />
            </div>
            <h2 className="content__title">
                {categoryId === 0 ? "Все продукты" : categoriesList[categoryId]}
            </h2>
            {status === "error" ? (
                <div className="content__error-info">
                    <h2>Помилка!</h2>
                    <p>Не вдалося отримати продукти</p>
                </div>
            ) : (
                <div className="content__items">
                    {status === "loading" ? productsSkeleton : productsBlocks}
                </div>
            )}
            <Pagination />
        </div>
    );
};

export default Home;
