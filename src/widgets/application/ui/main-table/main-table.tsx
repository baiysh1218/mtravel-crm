import { useSearchParams } from "react-router-dom";

import { useGetListAppealsQuery } from "@/entities/application/api/api.ts";
import { Application } from "@/entities/application/ui/application-table";
import { getParams } from "@/pages/main-page/lib";
import { Pagination } from "@/shared/pagination";

import styles from "./styles.module.scss";

export const MainTable = () => {
  const [_, setParams] = useSearchParams();

  const { toDate, fromDate, search, ...props } = getParams();

  const { data, isFetching } = useGetListAppealsQuery({
    query_search: search,
    date_from: fromDate,
    date_to: toDate,
    ...props,
  });

  const onClickPagination = (page: number) => {
    setParams((data) => {
      data.set("page", String(page));

      return data;
    });
  };

  const countPages = Math.ceil((data?.count || 1) / (data?.page_size || 1));

  const currentPage = props?.page > countPages ? 1 : props.page;

  return (
    <div className={styles.container}>
      <Application />

      {!isFetching && (
        <div className={styles.pagination}>
          <Pagination
            page={currentPage}
            countPage={countPages}
            onChange={onClickPagination}
          />
        </div>
      )}
    </div>
  );
};
