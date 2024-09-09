import { FC } from "react";

import { PaginationPageModel } from "@/shared/models/pagination.ts";
import { PaginationArrow } from "@/shared/ui/pagination-arrow";
import { PaginationCurrentPage } from "@/shared/ui/pagination-current-page";
import { PaginationPages } from "@/shared/ui/pagination-pages";

import styles from "./styles.module.scss";

interface Props extends PaginationPageModel {}

export const Pagination: FC<Props> = (props) => {
  const { page, onChange, countPage } = props;

  const onNextPage = () => {
    if ((countPage || 0) > page) {
      onChange?.(page + 1);
    }
  };

  const onPrevPage = () => {
    if (page > 1) {
      onChange?.(page - 1);
    }
  };

  const onEnteredValue = (page: number) => {
    onChange?.(page);
  };

  return (
    <div className={styles.container}>
      <PaginationCurrentPage {...props} onChange={onEnteredValue} />

      <PaginationPages {...props} />

      <PaginationArrow onPrevPage={onPrevPage} onNextPage={onNextPage} />
    </div>
  );
};
