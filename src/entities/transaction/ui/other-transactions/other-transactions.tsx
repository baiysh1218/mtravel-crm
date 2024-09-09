import { FC } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

import { useGetDetailAppealQuery } from "@/entities/application/api/api.ts";
import {
  LIST_STATUS_APPLICATION,
  REQUEST_STATUS,
  ROUTER_NAVIGATION,
  STATUS_NAMES_APPLICATION,
  TYPE_APPLICATION,
} from "@/shared/constants";
import { formatShowPrice } from "@/shared/helper/formatShowPrice.ts";
import { Button } from "@/shared/ui/button";
import { StatusTransaction } from "@/shared/ui/status-transaction";
import { Table } from "@/shared/ui/table";

import s from "./styles.module.scss";

interface Props {}

export const OtherTransactions: FC<Props> = () => {
  const navigate = useNavigate();
  const { id: appealID } = useParams();

  if (!appealID) return null;

  const { data: appealDetail, isFetching } = useGetDetailAppealQuery(appealID);

  const onGoDetailAppeal = (id: string) => {
    navigate(`${ROUTER_NAVIGATION.DETAIL_APPLICATION}/${id}`);
  };

  const columns = [
    {
      title: "№ транзакции",
      dataIndex: "id",
      key: "id",
      width: "25%",
    },
    {
      title: "Наименование услуги",
      dataIndex: "service",
      key: "service",
      width: "20%",
      render: (key: TYPE_APPLICATION) => {
        const statusOfPayment = STATUS_NAMES_APPLICATION[key];

        return <span>{statusOfPayment}</span>;
      },
    },
    {
      title: "Сумма",
      dataIndex: "amount",
      key: "amount",
      width: "20%",
    },
    {
      title: "Статус заявки",
      dataIndex: "status",
      key: "status",
      width: "20%",
      render: (key: REQUEST_STATUS) => {
        const statusOfPayment = LIST_STATUS_APPLICATION.filter(
          (item) => item.value === key,
        )[0];

        return <StatusTransaction {...statusOfPayment} />;
      },
    },
    {
      title: "",
      dataIndex: "button",
      key: "button",
      render: (_: unknown, data: { idAppeal: string }) => {
        return (
          <Button
            type="third"
            variant="nr"
            onClick={() => onGoDetailAppeal(data.idAppeal)}
            paddingVariant="paddingSmall"
          >
            Перейти
          </Button>
        );
      },
    },
  ];

  const otherAppeals = appealDetail?.flight_appeal?.transactions?.map(
    (item) => ({
      id: item.id,
      idAppeal: item.appeal_id,
      service: item.appeal_topic,
      amount: formatShowPrice(item.amount),
      status: item.appeal_status,
    }),
  );

  return (
    <section className={s.container}>
      <p className={s.title}>Транзакциии</p>

      <Table
        loading={isFetching}
        dataSource={otherAppeals}
        columns={columns}
        pagination={false}
      />
    </section>
  );
};
