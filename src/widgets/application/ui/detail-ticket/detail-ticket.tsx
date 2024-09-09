import { TableColumnsType } from "antd";
import { clsx } from "clsx";
import { FC } from "react";
import { useParams } from "react-router-dom";

import { useGetDetailAppealQuery } from "@/entities/application/api/api.ts";
import { ApplicationDetailFlight } from "@/entities/application/ui/application-detail-flight";
import { ApplicationDetailTransfer } from "@/entities/transaction/ui/application-detail-transfer";
import { TYPE_AGE } from "@/shared/constants";
import { formatDate, prepareTimeShow } from "@/shared/helper/formatDate.ts";
import { ArrowIcon } from "@/shared/icons/arrow-icon";
import { getSegmentsByDirections } from "@/shared/lib/hooks.ts";
import { Segment } from "@/shared/models/flight";
import { Table } from "@/shared/ui/table";

import { getPassengersInfo } from "../../lib";
import s from "./styles.module.scss";

interface DataType {
  from?: string;
  to?: string;
  depTime?: string;
  arrTime?: string;
  class?: string;
  adt?: string;
  chd?: string;
  inf?: string;
  infW?: string;
  count?: string;
  segments?: Segment[];
}

export const DetailTicket: FC = () => {
  const { id: appealID } = useParams();

  if (!appealID) return null;

  const { data: appealDetail, isFetching } = useGetDetailAppealQuery(appealID);

  const columns: TableColumnsType<DataType> = [
    { title: "Откуда", dataIndex: "from", key: "from" },
    { title: "Куда", dataIndex: "to", key: "to" },
    { title: "Дата и время вылета", dataIndex: "depTime", key: "depTime" },
    { title: "Дата и время посадки", dataIndex: "arrTime", key: "arrTime" },
    { title: "Класс", dataIndex: "class", key: "class" },
    { title: "Взрослый", dataIndex: "adt", key: "adt" },
    { title: "Дети", dataIndex: "chd", key: "chd" },
    { title: "Мл. с местом", dataIndex: "inf", key: "inf" },
    { title: "Мл. без места", dataIndex: "infW", key: "infW" },
    { title: "Кол. пассажиров", dataIndex: "count", key: "count" },
  ];

  const [directionSegment, returnDirection] = getSegmentsByDirections(
    appealDetail?.flight_appeal?.ticket?.[0]?.flight_details?.flight.segments,
  );

  const [firstDirectionSegment, lastDirectionSegment] = [
    directionSegment?.at(0),
    directionSegment?.at(-1),
  ];
  const [firstReturnSegment, lastReturnSegment] = [
    returnDirection?.at(0),
    returnDirection?.at(-1),
  ];

  const dataPassengers = getPassengersInfo(
    appealDetail?.flight_appeal.ticket?.[0]?.flight_details?.tickets?.[0]
      ?.passengers,
  );

  const data: DataType[] = [
    {
      from: `${firstDirectionSegment?.dep?.city?.title || ""} (${
        firstDirectionSegment?.dep.city.code || ""
      })`,
      to: `${lastDirectionSegment?.arr.city.title || ""} (${
        lastDirectionSegment?.arr.city.code || ""
      })`,
      depTime: formatDate(firstDirectionSegment?.dep.datetime),
      arrTime: formatDate(lastDirectionSegment?.arr.datetime),
      class: firstDirectionSegment?.class_.title,
      adt: `${dataPassengers[TYPE_AGE.ADULT] || 0}`,
      chd: `${dataPassengers[TYPE_AGE.CHILD] || 0}`,
      inf: `${dataPassengers[TYPE_AGE.INFANT] || 0}`,
      infW: `${dataPassengers[TYPE_AGE.INFANT] || 0}`,
      count: `${dataPassengers?.totalCount}`,
      segments: directionSegment || undefined,
    },
  ];

  if (firstReturnSegment) {
    data.push({
      from: `${firstReturnSegment?.dep.city.title} (${firstReturnSegment?.dep.city.code})`,
      to: `${lastReturnSegment?.arr.city.title} (${lastReturnSegment?.arr.city.code})`,
      depTime: firstReturnSegment?.dep.datetime,
      arrTime: lastReturnSegment?.arr.datetime,
      class: firstReturnSegment?.class_.title,
      adt: `${dataPassengers[TYPE_AGE.ADULT] || 0}`,
      chd: `${dataPassengers[TYPE_AGE.CHILD] || 0}`,
      inf: `${dataPassengers[TYPE_AGE.INFANT] || 0}`,
      infW: `${dataPassengers[TYPE_AGE.INFANT] || 0}`,
      count: `${dataPassengers?.totalCount}`,
      segments: returnDirection || undefined,
    });
  }

  return (
    <div className={s.container}>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={data}
        expandable={{
          expandedRowRender: (segmentsItem: DataType) => {
            return (
              <>
                {segmentsItem.segments?.map((item) => (
                  <div key={item.ticket_duration}>
                    <div className={s.block}>
                      <ApplicationDetailFlight segment={item} />
                    </div>

                    {item?.duration?.transfer ? (
                      <div className={s.block}>
                        <ApplicationDetailTransfer
                          left={item?.arr?.city?.title || ""}
                          right={`Ожидание: ${prepareTimeShow(
                            item.duration.flight.common,
                          )}`}
                        />
                      </div>
                    ) : null}
                  </div>
                ))}
              </>
            );
          },
          expandedRowClassName: () => {
            return s.rowExpand;
          },
          expandIcon: (data) => {
            return (
              // @ts-ignore
              <span onClick={() => data?.onExpand(data?.record)}>
                <ArrowIcon
                  type={data?.expanded ? "bottom" : "top"}
                  className={clsx(data?.expanded ? s.active : s.default)}
                />
              </span>
            );
          },
        }}
      />
    </div>
  );
};
