import { Manager } from "@/entities/managers/model";
import { baseApi } from "@/shared/api/api.ts";

export const managersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getManagers: build.query<Manager[], void>({
      query: () => ({
        url: "/users/get_managers/",
      }),
    }),
  }),
});

export const { useGetManagersQuery } = managersApi;
