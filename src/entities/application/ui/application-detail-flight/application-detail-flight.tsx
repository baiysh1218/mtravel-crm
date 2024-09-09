import { FC } from "react";

import { Segment } from "@/shared/models/flight";
import { DetailInformation } from "@/shared/ui/detail-information";

import s from "./styles.module.scss";

interface Props {
  segment: Segment;
}

export const ApplicationDetailFlight: FC<Props> = ({ segment }) => {
  return (
    <div className={s.container}>
      <DetailInformation
        title="Откуда"
        subTitle={`${segment?.dep?.city?.title} (${segment?.dep?.city?.code})`}
      />
      <DetailInformation
        title="Куда"
        subTitle={`${segment?.arr?.city?.title} (${segment?.arr?.city?.code})`}
      />
      <DetailInformation
        title="Дата и время вылета"
        subTitle={segment?.dep.datetime}
      />
      <DetailInformation
        title="Дата и время посадки"
        subTitle={segment?.arr.datetime}
      />
      <DetailInformation title="Авиалиния" subTitle={segment.carrier.title} />
      <DetailInformation
        title="Рейс"
        subTitle={`${segment?.carrier.code}-${segment?.flight_number}`}
      />
      <DetailInformation
        title="Багаж"
        subTitle={
          segment?.baggage?.weight
            ? `${segment?.baggage?.weight} кг`
            : "Неизвестно"
        }
      />
      <DetailInformation
        title="Ручная кладь"
        subTitle={
          segment?.cbaggage?.weight
            ? `${segment?.cbaggage?.weight} кг`
            : "Неизвестно"
        }
      />
    </div>
  );
};
