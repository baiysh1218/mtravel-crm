import { FC } from "react";
import { useNavigate } from "react-router";

import { useGetListAppealsQuery } from "@/entities/application/api";
import { getParams } from "@/pages/main-page/lib";
import {
  REQUEST_NAME_STATUS,
  REQUEST_STATUS,
  ROUTER_NAVIGATION,
  STATUS_NAMES_APPLICATION,
  TYPE_APPLICATION,
} from "@/shared/constants";
import { formatDate } from "@/shared/helper/formatDate.ts";
import { AppIcon } from "@/shared/icons/app-icon";
import { AllIcons } from "@/shared/icons/app-icon/types.ts";
import { Table } from "@/shared/ui/table";

import s from "./styles.module.scss";

interface Props {}

export const Application: FC<Props> = () => {
  const navigate = useNavigate();

  const { toDate, fromDate, search, ...props } = getParams();

  const columns = [
    {
      title: "№",
      dataIndex: "num",
      key: "num",
      width: "5%",
    },
    {
      title: "Номер билета",
      dataIndex: "numberTicket",
      key: "numberTicket",
    },
    {
      title: "Ф.И.О. заказчика",
      dataIndex: "fullName",
      key: "fullName",
      width: "12%",
    },
    {
      title: "Номер телефона",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Тема обращения",
      dataIndex: "topic",
      key: "topic",
      render: (item: TYPE_APPLICATION) => {
        return <span>{STATUS_NAMES_APPLICATION[item]}</span>;
      },
    },
    {
      title: "СМС",
      dataIndex: "message",
      key: "message",
      render: (item: number) => {
        return (
          <div className={s.letter}>
            <AppIcon
              id={AllIcons.LETTER}
              className={s.icon}
              width={16}
              height={16}
            />

            {item > 0 ? <span className={s.indicator}>{item}</span> : null}
          </div>
        );
      },
    },
    {
      title: "Статус заявки",
      dataIndex: "status",
      key: "status",
      render: (item: REQUEST_STATUS) => {
        return <span>{REQUEST_NAME_STATUS[item]}</span>;
      },
    },
    {
      title: "Время создания заявки",
      dataIndex: "createdAppeal",
      key: "createdAppeal",
    },
    {
      title: "Обращение",
      dataIndex: "details",
      key: "details",
    },
  ];

  const { data, isFetching } = useGetListAppealsQuery({
    query_search: search,
    date_from: fromDate,
    date_to: toDate,
    ...props,
  });

  const dataSource = data?.results?.map((item, index) => ({
    num: index + 1,
    key: index + 1,
    message: item?.new_messages_count,
    numberTicket: item.id,
    phoneNumber: item.user.phone_number,
    fullName: `${item.user.last_name} ${item.user.first_name}`,
    topic: item.topic,
    details: item.details,
    createdAppeal: formatDate(item.created_at),
    status: item.status,
  }));

  const onClickDetailHandler = (router: string) => {
    navigate(`${ROUTER_NAVIGATION.DETAIL_APPLICATION}/${router}`);
  };

  return (
    <div className={s.container}>
      <Table
        loading={isFetching}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        onRow={(appeal) => ({
          onClick: () => onClickDetailHandler(appeal.numberTicket),
        })}
      />
    </div>
  );
};
