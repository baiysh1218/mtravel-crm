import { AuthorizeUser, User } from "@/entities/profile/model/types.ts";
import { baseApi } from "@/shared/api/api.ts";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    authUser: build.mutation<User, AuthorizeUser>({
      query: (credentials) => ({
        url: "/users/login/",
        method: "POST",
        body: credentials,
      }),
    }),
    getMe: build.mutation<any, void>({
      query: () => ({
        method: "GET",
        url: "/users/me/",
      }),
    }),
  }),
});

export const { useAuthUserMutation, useGetMeMutation } = userApi;
