import { useSearchParams } from "react-router-dom";

import { useGetCountAppealsOfStatusQuery } from "@/entities/application/api/api.ts";
import { getParams } from "@/pages/main-page/lib";
import { REQUEST_STATUS, REQUEST_STATUS_COLOR } from "@/shared/constants";
import { formatShowPrice } from "@/shared/helper/formatShowPrice.ts";
import {
  ButtonProps,
  StatusButton,
} from "@/shared/ui/status-button/status-button.tsx";

export const StatusesRequestButtons = () => {
  const [_, setParams] = useSearchParams();

  const { toDate, fromDate, search, ...props } = getParams();

  const { data, isFetching } = useGetCountAppealsOfStatusQuery({
    query_search: search,
    date_from: fromDate,
    date_to: toDate,
    ...props,
  });

  const preparedData: { [index: string]: number } = {};

  data?.forEach((item) => {
    preparedData[item.status] = parseInt(item.count || "0");
  });

  const allCountAppeals = data?.reduce(
    (sum, appeal) => sum + parseInt(appeal.count),
    0,
  );

  const ListStatusName: ButtonProps[] = [
    {
      name: "Все",
      key: REQUEST_STATUS.ALL,
      count: formatShowPrice(allCountAppeals),
      color: REQUEST_STATUS_COLOR[REQUEST_STATUS.ALL],
    },
    {
      name: "В работе",
      key: REQUEST_STATUS.WORKING,
      count: formatShowPrice(preparedData[REQUEST_STATUS.WORKING]),
      color: REQUEST_STATUS_COLOR[REQUEST_STATUS.WORKING],
    },
    {
      name: "На стороне авиакассы",
      key: REQUEST_STATUS.AVIA,
      count: formatShowPrice(preparedData[REQUEST_STATUS.AVIA]),
      color: REQUEST_STATUS_COLOR[REQUEST_STATUS.AVIA],
    },
    {
      name: "Новое",
      key: REQUEST_STATUS.NEW,
      count: formatShowPrice(preparedData[REQUEST_STATUS.NEW]),
      color: REQUEST_STATUS_COLOR[REQUEST_STATUS.NEW],
    },
    {
      name: "Закрыто",
      key: REQUEST_STATUS.CLOSED,
      count: formatShowPrice(preparedData[REQUEST_STATUS.CLOSED]),
      color: REQUEST_STATUS_COLOR[REQUEST_STATUS.CLOSED],
    },
  ];

  const onClickStatusHandler = (key: string) => {
    setParams((data) => {
      if (key === REQUEST_STATUS.ALL) {
        data.set("status", "");

        return data;
      }

      data.set("status", key);
      data.set("page", "1");

      return data;
    });
  };

  if (isFetching) return null;

  return (
    <StatusButton
      buttons={ListStatusName}
      onClick={onClickStatusHandler}
      defaultValue={props.status}
    />
  );
};
