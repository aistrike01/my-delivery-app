import React from "react";
import { useSearchParams } from "react-router-dom";
import { Categories, Pagination, ProductBlock, Skeleton, Sort } from "../components";
import ProductEmpty from "../components/ProductBlock/ProductEmpty";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { selectFilter, setFilters } from "../store/filter";
import { fetchProducts, IProduct, selectProduct } from "../store/product";

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const { searchValue, categoryId, categoriesList, sortId, sortTypesList, currentPage } =
        useAppSelector(selectFilter);
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const { items: products, status } = useAppSelector(selectProduct);

    React.useEffect(() => {
        const sort = searchParams.get("sort") || "";
        const order = searchParams.get("order") || "";
        const category = searchParams.get("category") || "";
        const page = searchParams.get("page") || "";

        const filters = { sort, order, category, page };

        dispatch(setFilters(filters));
    }, [dispatch, searchParams, sortTypesList]);

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
            setSearchParams(
                new URLSearchParams(
                    `sort=${sortTypesList[sortId].sortName}&order=${sortTypesList[sortId].order}&category=${categoryId}&page=${currentPage}`
                )
            );
        }
        isMounted.current = true;
    }, [categoryId, currentPage, setSearchParams, sortId, sortTypesList]);

    const filterProducts = products.filter((product: IProduct) =>
        product.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ? true : false
    );

    /// Check if product is empty
    const productsBlocks =
        filterProducts.length === 0 ? (
            <ProductEmpty />
        ) : (
            filterProducts.map((item: IProduct) => <ProductBlock key={item.id} {...item} />)
        );
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
