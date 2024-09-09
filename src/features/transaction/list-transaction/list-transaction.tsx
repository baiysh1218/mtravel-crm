import { FC } from "react";

import { useGetListTransactionsQuery } from "@/entities/transaction/api/api.ts";
import { getParams } from "@/pages/transactions/lib";
import {
  TRANSACTION_STATUS,
  TRANSACTION_STATUS_COLOR,
} from "@/shared/constants";
import { formatDate } from "@/shared/helper/formatDate.ts";
import { Table } from "@/shared/ui/table";

import s from "./styles.module.scss";

interface Props {}

export const ListTransaction: FC<Props> = () => {
  const { toDate, fromDate, search, ...props } = getParams();

  const columns = [
    {
      title: "№",
      dataIndex: "num",
      key: "num",
      width: "5%",
    },
    {
      title: "Номер транзакции",
      dataIndex: "transactionNumber",
      key: "transactionNumber",
    },
    {
      title: "Ф.И.О. заказчика",
      dataIndex: "fullName",
      key: "fullName",
      width: "12%",
    },
    {
      title: "Номер билета",
      dataIndex: "billingNumber",
      key: "billingNumber",
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (statusKey: TRANSACTION_STATUS) => {
        const statusName = TRANSACTION_STATUS_COLOR?.filter(
          (it) => it.key === statusKey,
        )[0];

        return <span>{statusName?.label}</span>;
      },
    },
    {
      title: "Время транзакции",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (statusKey: string) => {
        console.log(statusKey);

        const preparedDate = formatDate(statusKey);

        return <span>{preparedDate}</span>;
      },
    },
    {
      title: "Провайдер",
      dataIndex: "paymentProvider",
      key: "paymentProvider",
    },
  ];

  const { data, isFetching } = useGetListTransactionsQuery({
    query_search: search,
    date_from: fromDate,
    date_to: toDate,
    ...props,
  });

  const dataSource = data?.results?.map((item, index) => ({
    num: index + 1,
    key: item.id,
    transactionNumber: item.id,
    fullName: `${item.user_last_name || ""} ${item.user_first_name || ""} ${
      item.user_middle_name || ""
    }`,
    billingNumber: item?.ticket_billing_number || "",
    status: item.status,
    createdAt: item.created_at,
    paymentProvider: item.payment_provider,
  }));

  return (
    <div className={s.container}>
      <Table
        loading={isFetching}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};
