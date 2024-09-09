import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { userApi } from "@/entities/profile/api/api.ts";
import { LOCALE_STORAGE_KEY } from "@/shared/constants";
import {
  removeLocalStore,
  removeSessionStore,
  setLocalStore,
  setSessionStore,
} from "@/shared/helper/useLocaleKey.ts";

import { SaveToken, User } from "./types.ts";

const initialState: { user?: User } = {};

export const userStore = createSlice({
  name: "userStore",
  initialState,
  reducers: {
    loginUser(_, data: PayloadAction<SaveToken>) {
      const { access, refresh, rememberMe } = data.payload;

      if (rememberMe) {
        setLocalStore(LOCALE_STORAGE_KEY.ACCESS, access || "");
        setLocalStore(LOCALE_STORAGE_KEY.REFRESH, refresh || "");
      } else {
        setSessionStore(LOCALE_STORAGE_KEY.ACCESS, access || "");
        setSessionStore(LOCALE_STORAGE_KEY.REFRESH, refresh || "");
      }
    },
    logOut() {
      removeLocalStore(LOCALE_STORAGE_KEY.ACCESS);
      removeSessionStore(LOCALE_STORAGE_KEY.ACCESS);
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userApi.endpoints.authUser.matchFulfilled,
        (state, { payload }) => {
          state.user = payload;

          return state;
        },
      )
      .addMatcher(
        userApi.endpoints.getMe.matchFulfilled,
        (state, { payload }) => {
          state.user = payload;
        },
      );
  },
});

export const { loginUser, logOut } = userStore.actions;
