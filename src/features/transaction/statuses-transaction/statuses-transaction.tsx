import { useSearchParams } from "react-router-dom";

import { useGetCountTransactionQuery } from "@/entities/transaction/api/api.ts";
import { getParams } from "@/pages/transactions/lib";
import {
  REQUEST_STATUS,
  TRANSACTION_STATUS,
  TRANSACTION_STATUS_COLOR,
} from "@/shared/constants";
import { formatShowPrice } from "@/shared/helper/formatShowPrice.ts";
import {
  ButtonProps,
  StatusButton,
} from "@/shared/ui/status-button/status-button.tsx";

export const StatusesTransaction = () => {
  const [_, setParams] = useSearchParams();

  const { toDate, fromDate, search, ...props } = getParams();

  const { data, isFetching } = useGetCountTransactionQuery({
    query_search: search,
    date_from: fromDate,
    date_to: toDate,
    ...props,
  });

  const preparedData: { [index: string]: number } = {};

  data?.status_counts?.forEach((item) => {
    preparedData[item.status] = item.count;
  });

  const allCountAppeals = data?.status_counts?.reduce(
    (sum, appeal) => sum + appeal.count,
    0,
  );

  const ListStatusName: ButtonProps[] = [
    {
      color: TRANSACTION_STATUS_COLOR[0].color,
      name: TRANSACTION_STATUS_COLOR[0]?.label,
      count: formatShowPrice(allCountAppeals),
      key: String(TRANSACTION_STATUS_COLOR[0].key),
    },
    {
      key: String(TRANSACTION_STATUS_COLOR[1].key),
      color: TRANSACTION_STATUS_COLOR[1].color,
      name: TRANSACTION_STATUS_COLOR[1]?.label,
      count: formatShowPrice(preparedData[TRANSACTION_STATUS.CREATED]),
    },
    {
      key: String(TRANSACTION_STATUS_COLOR[2].key),
      color: TRANSACTION_STATUS_COLOR[2].color,
      name: TRANSACTION_STATUS_COLOR[2]?.label,
      count: formatShowPrice(preparedData[TRANSACTION_STATUS.PENDING]),
    },
    {
      key: String(TRANSACTION_STATUS_COLOR[3].key),
      color: TRANSACTION_STATUS_COLOR[3].color,
      name: TRANSACTION_STATUS_COLOR[3]?.label,
      count: formatShowPrice(preparedData[TRANSACTION_STATUS.SUCCESS]),
    },
    {
      key: String(TRANSACTION_STATUS_COLOR[4].key),
      color: TRANSACTION_STATUS_COLOR[4].color,
      name: TRANSACTION_STATUS_COLOR[4]?.label,
      count: formatShowPrice(preparedData[TRANSACTION_STATUS.ERROR]),
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
