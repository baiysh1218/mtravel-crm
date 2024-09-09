import {
  type BaseQueryFn,
  type FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { LOCALE_STORAGE_KEY } from "@/shared/constants";
import {
  getLocalStore,
  getSessionStore,
  removeLocalStore,
  removeSessionStore,
  setLocalStore,
  setSessionStore,
} from "@/shared/helper/useLocaleKey.ts";

import { type ApiError, RefreshToken } from "../models";

const baseUrl = import.meta.env.VITE_API_URL;

const _baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token =
      getLocalStore(LOCALE_STORAGE_KEY.ACCESS) ||
      getSessionStore(LOCALE_STORAGE_KEY.ACCESS);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
}) as BaseQueryFn<string | FetchArgs, unknown, ApiError>;

export const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  ApiError,
  {}
> = async (args, api, extraOptions) => {
  const result = await _baseQuery(args, api, extraOptions);

  // @ts-ignore
  if (result.error && result.error.status === 401) {
    const getTokenSession = getSessionStore(LOCALE_STORAGE_KEY.REFRESH);
    const getTokenLocal = getLocalStore(LOCALE_STORAGE_KEY.REFRESH);

    // @ts-ignore
    const response: RefreshToken = await _baseQuery(
      {
        url: "users/token/refresh/",
        method: "POST",
        body: { refresh: getTokenSession || getTokenLocal },
      },
      api,
      extraOptions,
    );

    removeSessionStore(LOCALE_STORAGE_KEY.ACCESS);
    removeLocalStore(LOCALE_STORAGE_KEY.ACCESS);

    // @ts-ignore
    if (response?.error?.status === 401) {
      location.pathname = "/auth";

      removeSessionStore(LOCALE_STORAGE_KEY.ACCESS);
      removeLocalStore(LOCALE_STORAGE_KEY.ACCESS);

      return result;
    }

    if (getTokenSession) {
      setSessionStore(LOCALE_STORAGE_KEY.ACCESS, response.data.access);
    } else {
      setLocalStore(LOCALE_STORAGE_KEY.ACCESS, response.data.access);
    }

    location.reload();
  }

  return result;
};
