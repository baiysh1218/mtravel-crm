import { FC } from "react";
import { useSearchParams } from "react-router-dom";

import { useGetListTransactionsQuery } from "@/entities/transaction/api/api.ts";
import { ListTransaction } from "@/features/transaction/list-transaction";
import { getParams } from "@/pages/transactions/lib";
import { Pagination } from "@/shared/pagination";

import s from "./styles.module.scss";

interface Props {}

export const TransactionList: FC<Props> = () => {
  const [_, setParams] = useSearchParams();

  const { page, search, fromDate, toDate, ...props } = getParams();

  const { data, isFetching } = useGetListTransactionsQuery({
    //checked
    page,
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

  const currentPage = page > countPages ? 1 : page;

  return (
    <div className={s.container}>
      <ListTransaction />

      {!isFetching && (
        <div className={s.pagination}>
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
