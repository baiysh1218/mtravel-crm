import { configureStore } from "@reduxjs/toolkit";

import { userStore } from "@/entities/profile/model/slice.ts";
import { baseApi } from "@/shared/api/api.ts";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [userStore.name]: userStore.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
