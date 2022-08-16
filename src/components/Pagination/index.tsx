import ReactPaginate from "react-paginate";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { selectCurrentPage } from "../../store/filter/selectors";
import { setCurrentPage } from "../../store/filter/slice";
import styles from "./Pagination.module.scss";

export default function Pagination() {
    const dispatch = useAppDispatch();
    const currentPage = useAppSelector(selectCurrentPage);
    const setPage = (value: number) => dispatch(setCurrentPage(value));
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
                renderOnZeroPageCount={() => null}
                forcePage={currentPage - 1}
            />
        </div>
    );
}
