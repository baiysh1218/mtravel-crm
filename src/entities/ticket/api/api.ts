import { FlightAppealTicket } from "@/entities/flight/model/flightTicket.ts";
import { baseApi } from "@/shared/api/api.ts";

export const ticketsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    searchTickets: build.mutation<string[], string>({
      query: (billingNumber) => ({
        url: `/crm/tickets-search/${billingNumber}/`,
        method: "GET",
      }),
    }),
    getDetailInfoByNumber: build.query<FlightAppealTicket, string>({
      query: (billingNumber) => ({
        url: `/crm/tickets/${billingNumber}/`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSearchTicketsMutation, useGetDetailInfoByNumberQuery } =
  ticketsApi;
