import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithRefresh } from "@/shared/api/query.ts";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: () => ({}),
});
