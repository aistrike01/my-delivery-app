import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/slices/filterSlice";
import styles from "./Pagination.module.scss";

export default function Pagination() {
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.filter.currentPage);
    const setPage = (value) => dispatch(setCurrentPage(value));
    return (
        <div>
            <ReactPaginate
                className={styles.root}
                breakLabel="..."
                previousLabel="<"
                nextLabel=">"
                onPageChange={(event) => setPage(event.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={3}
                renderOnZeroPageCount={null}
                forcePage={currentPage - 1}
            />
        </div>
    );
}
