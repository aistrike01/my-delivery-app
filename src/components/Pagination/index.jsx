import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { setPageCount } from "../../redux/slices/filterSlice";
import styles from "./Pagination.module.scss";

export default function Pagination() {
    const dispatch = useDispatch();
    const setPage = (value) => dispatch(setPageCount(value));
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
            />
        </div>
    );
}
