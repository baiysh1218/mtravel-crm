import { FC } from "react";
import ReactPaginate from "react-paginate";

import { PaginationPageModel } from "@/shared/models/pagination.ts";

import styles from "./styles.module.scss";

export const PaginationPages: FC<PaginationPageModel> = (props) => {
  const { page, countPage, onChange } = props;

  return (
    <ReactPaginate
      previousClassName={styles.prev}
      nextClassName={styles.next}
      activeClassName={styles.selected}
      className={styles.pag}
      breakLabel="..."
      nextLabel=""
      forcePage={page - 1}
      onPageChange={(item) => onChange?.(item.selected + 1)}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={countPage || 0}
      previousLabel=""
      renderOnZeroPageCount={() => null}
    />
  );
};
