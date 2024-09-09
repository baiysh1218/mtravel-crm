import {
  AddInformationAppeal,
  AppealsSubjects,
  ChangeAppealData,
  MessageAppeal,
} from "@/entities/application/module";
import {
  AppealFlight,
  FlightAppealMessage,
} from "@/entities/application/module/appeal-detail.ts";
import {
  AppealsList,
  StatusAppeal,
  TypeAppealCount,
} from "@/entities/application/module/appealItem.ts";
import {
  ExchangeAppeal,
  RefundTicket,
} from "@/entities/application/module/edit-appeal.ts";
import { baseApi } from "@/shared/api/api.ts";

interface SearchProps {
  date_from?: string;
  date_to?: string;
  query_search?: string;
  page?: number;
  type?: string;
  status?: string;
  page_size?: string;
}

export const appealsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTopicsCounter: build.query<TypeAppealCount, SearchProps>({
      query: (credentials) => ({
        method: "GET",
        params: credentials,
        url: "/crm/appeals/topic-counter/",
      }),
      keepUnusedDataFor: 0,
    }),
    getCountAppealsOfStatus: build.query<StatusAppeal[], SearchProps>({
      query: (credentials) => ({
        method: "GET",
        params: credentials,
        url: "/crm/appeals/status-counter/",
      }),
      keepUnusedDataFor: 0,
    }),
    getListAppeals: build.query<AppealsList, SearchProps>({
      query: (credentials) => ({
        url: "/crm/appeals/",
        method: "GET",
        params: credentials,
      }),
      keepUnusedDataFor: 0,
    }),
    getDetailAppeal: build.query<AppealFlight, string>({
      query: (id) => ({
        url: `/crm/appeals/${id}/`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
    getAppealSubjects: build.query<AppealsSubjects[], void>({
      query: () => ({
        url: `/crm/appeals-subjects/`,
        method: "GET",
      }),
    }),
    onCreateReturnRefundAppeal: build.mutation<any, FormData>({
      query: (data) => ({
        url: `/crm/appeals/create/`,
        method: "POST",
        body: data,
      }),
    }),
    onRefundTicket: build.mutation<void, RefundTicket>({
      query: (data) => ({
        url: `/crm/appeals/refund/`,
        method: "POST",
        body: data,
      }),
    }),
    updateAppealDetail: build.mutation<void, ChangeAppealData<ExchangeAppeal>>({
      query: (data) => ({
        url: `/crm/appeals/update-appeal-details/${data.billing_id}/`,
        method: "PUT",
        body: data,
      }),
    }),
    onSendMessage: build.mutation<void, MessageAppeal>({
      query: (data) => ({
        url: `/crm/appeals/send-message/`,
        method: "POST",
        body: data,
      }),
    }),
    addInformationAppeal: build.mutation<
      void,
      ChangeAppealData<AddInformationAppeal>
    >({
      query: (credentials) => ({
        url: `/crm/appeals/${credentials.billing_id}/`,
        method: "PATCH",
        body: credentials.data,
      }),
    }),
    getMessagesAppeal: build.query<
      FlightAppealMessage[],
      { billing_id: string }
    >({
      query: ({ billing_id }) => ({
        url: `/crm/appeals-messages/${billing_id}/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetListAppealsQuery,
  useGetDetailAppealQuery,
  useGetAppealSubjectsQuery,
  useOnCreateReturnRefundAppealMutation,
  useOnRefundTicketMutation,
  useUpdateAppealDetailMutation,
  useOnSendMessageMutation,
  useAddInformationAppealMutation,
  useGetMessagesAppealQuery,
  useGetTopicsCounterQuery,
  useGetCountAppealsOfStatusQuery,
} = appealsApi;
