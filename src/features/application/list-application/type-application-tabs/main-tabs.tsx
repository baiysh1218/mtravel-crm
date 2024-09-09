import { MenuProps } from "antd";
import { FC } from "react";
import { useSearchParams } from "react-router-dom";

import { useGetTopicsCounterQuery } from "@/entities/application/api/api.ts";
import { getParams } from "@/pages/main-page/lib";
import { TYPE_APPLICATION } from "@/shared/constants";
import { Tabs } from "@/shared/ui/tabs";
import { MenuItem } from "@/shared/ui/tabs/tabs.tsx";

interface Props {}

export const MainTabs: FC<Props> = () => {
  const [_, setParams] = useSearchParams();

  const { toDate, fromDate, search, ...props } = getParams();

  const preparedData: { [index: string]: number } = {};

  const { data, isFetching } = useGetTopicsCounterQuery({
    query_search: search,
    date_from: fromDate,
    date_to: toDate,
    ...props,
  });

  data?.topic_counts?.forEach((item) => {
    preparedData[item.topic] = item.count;
  });

  const listTabs: MenuItem[] = [
    {
      label: `Все (${data?.appeals_counts || 0})`,
      key: TYPE_APPLICATION.ALL,
    },
    {
      label: `Возврат (${preparedData[TYPE_APPLICATION.REFUND] || 0})`,
      key: TYPE_APPLICATION.REFUND,
    },
    {
      label: `Обмен (${preparedData[TYPE_APPLICATION.EXCHANGE] || 0})`,
      key: TYPE_APPLICATION.EXCHANGE,
    },
    {
      label: `Доп. услуги (${preparedData[TYPE_APPLICATION.ADDITIONAL_SERVICE] || 0})`,
      key: TYPE_APPLICATION.ADDITIONAL_SERVICE,
    },
    {
      label: `Другие (${preparedData[TYPE_APPLICATION.OTHER] || 0})`,
      key: TYPE_APPLICATION.OTHER,
    },
  ];

  const onClick: MenuProps["onClick"] = ({ key }) => {
    setParams((data) => {
      if (key === TYPE_APPLICATION.ALL) {
        data.set("topic", "");

        return data;
      }

      data.set("topic", key);
      data.set("page", "1");

      return data;
    });
  };

  if (isFetching) return null;

  return <Tabs items={listTabs} onClick={onClick} defaultValue={props.topic} />;
};
