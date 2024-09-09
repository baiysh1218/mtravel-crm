import { FC } from "react";
import { useSearchParams } from "react-router-dom";

import { useGetDetailInfoByNumberQuery } from "@/entities/ticket/api";
import { Paper } from "@/shared/ui/paper";
import { TitleText } from "@/shared/ui/title-text";

import s from "./styles.module.scss";

interface Props {}

export const FlightDetailInformation: FC<Props> = () => {
  const [param] = useSearchParams();

  const searchedBilling = param.get("searched");

  if (!searchedBilling) return null;

  const { data, isFetching } = useGetDetailInfoByNumberQuery(searchedBilling);

  const ListDetFlight = [
    {
      title: "Обмен",
      text: data?.is_change ? "Есть" : "Нет",
    },
    {
      title: "Возврат",
      text: data?.is_refund ? "Есть" : "Нет",
    },
    {
      title: "Багаж",
      text: data?.is_baggage ? "Есть" : "Нет",
    },
    {
      title: "Ручная кладь",
      text: data?.is_cbaggage ? "Есть" : "Нет",
    },
  ];

  return (
    <Paper isLoading={isFetching}>
      <div className={s.container}>
        <p className={s.title}>Детали перелета</p>

        <div className={s.wrapper}>
          {ListDetFlight?.map((item, index) => (
            <div className={s.item}>
              <TitleText key={"det" + index} {...item} />
            </div>
          ))}
        </div>
      </div>
    </Paper>
  );
};
