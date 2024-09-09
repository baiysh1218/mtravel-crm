import { FC } from "react";
import { useSearchParams } from "react-router-dom";

import { useGetDetailInfoByNumberQuery } from "@/entities/ticket/api";
import { formatDate } from "@/shared/helper/formatDate.ts";
import { getSegmentsByDirections } from "@/shared/lib/hooks.ts";
import { Paper } from "@/shared/ui/paper";
import { TitleText } from "@/shared/ui/title-text";
import { Props as TitleTextProps } from "@/shared/ui/title-text/title-text.tsx";

import s from "./styles.module.scss";

export interface Segments {
  title: string;
  segments?: {
    flights?: TitleTextProps[];
    transfer?: TitleTextProps;
  }[];
}

interface Props {}

export const FlightsInformation: FC<Props> = () => {
  const [param] = useSearchParams();

  const searchedBilling = param.get("searched");

  if (!searchedBilling) return null;

  const { data, isFetching } = useGetDetailInfoByNumberQuery(searchedBilling);

  const [directionSegment, returnDirection] = getSegmentsByDirections(
    data?.flight_details?.flight?.segments,
  );

  const [firstDirectionSegment, lastDirectionSegment] = [
    directionSegment?.at(0),
    directionSegment?.at(-1),
  ];
  const [firstReturnSegment, lastReturnSegment] = [
    returnDirection?.at(0),
    returnDirection?.at(-1),
  ];

  const flightDataItem: Segments[] = [
    {
      title: `${firstDirectionSegment?.dep?.city?.title || ""} - ${
        lastDirectionSegment?.arr?.city?.title || ""
      }`,
      segments: directionSegment?.map((segment) => ({
        flights: [
          {
            title: "Откуда",
            text: `${segment?.dep?.city?.title} (${segment?.dep?.city?.code})`,
          },
          {
            title: "Куда",
            text: `${segment?.arr?.city?.title} (${segment?.arr?.city?.code})`,
          },
          {
            title: "Дата и время вылета",
            text: `${formatDate(segment?.dep?.datetime, "D MMM, ddd; HH:mm")}`,
          },
          {
            title: "Дата и время прилета",
            text: `${formatDate(segment?.arr?.datetime, "D MMM, ddd; HH:mm")}`,
          },
        ],
        transfer: segment?.duration?.transfer
          ? {
              title: "Пересадка",
              text: `${segment?.arr?.city.title}, ${segment?.duration?.transfer}`,
            }
          : undefined,
      })),
    },
  ];

  if (firstReturnSegment) {
    flightDataItem.push({
      title: `${firstReturnSegment?.dep?.city?.title} - ${lastReturnSegment?.arr?.city?.title}`,
      segments: returnDirection?.map((segment) => ({
        flights: [
          {
            title: "Откуда",
            text: `${segment?.dep?.city?.title} (${segment?.dep?.city?.code})`,
          },
          {
            title: "Куда",
            text: `${segment?.arr?.city?.title} (${segment?.arr?.city?.code})`,
          },
          {
            title: "Дата и время вылета",
            text: `${segment?.dep?.datetime}`,
          },
          {
            title: "Дата и время прилета",
            text: `${segment?.arr?.datetime}`,
          },
        ],
        transfer: segment?.duration?.transfer
          ? {
              title: "Пересадка",
              text: `${segment?.arr?.city.title}, ${segment?.duration?.transfer}`,
            }
          : undefined,
      })),
    });
  }

  if (!flightDataItem?.length) return null;

  return (
    <Paper isLoading={isFetching}>
      <div className={s.container}>
        <p className={s.title}>Информация о перелете</p>

        {flightDataItem?.map((flight, flightIndex) => (
          <div className={s.wrapper} key={"flight" + flightIndex}>
            <p className={s.itemTitle}>{flight.title}</p>

            <div className={s.blocks}>
              {flight?.segments?.map((segmentItem) => (
                <>
                  {segmentItem?.flights?.map((flight, index) => (
                    <div className={s.block} key={"segment" + index}>
                      <TitleText {...flight} />
                    </div>
                  ))}

                  {segmentItem?.transfer ? (
                    <div className={s.transfer}>
                      <TitleText {...segmentItem?.transfer} />
                    </div>
                  ) : null}
                </>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Paper>
  );
};
