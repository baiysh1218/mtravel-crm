import {
  StatusCountResult,
  TransactionList,
} from "@/entities/transaction/api/index.ts";
import { baseApi } from "@/shared/api/api.ts";

interface SearchProps {
  query_search?: string;
  date_from?: string;
  date_to?: string;
  page?: number;
  status?: string;
  page_size?: string;
}

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getListTransactions: build.query<TransactionList, SearchProps>({
      query: (credentials) => ({
        method: "GET",
        params: credentials,
        url: "/crm/transactions/",
      }),
      keepUnusedDataFor: 0,
    }),
    getCountTransaction: build.query<StatusCountResult, SearchProps>({
      query: (credentials) => ({
        method: "GET",
        params: credentials,
        url: "/crm/transactions/status-counter/",
      }),
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetListTransactionsQuery, useGetCountTransactionQuery } =
  transactionApi;
