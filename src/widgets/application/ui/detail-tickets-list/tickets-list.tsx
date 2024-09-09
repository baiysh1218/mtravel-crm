import { TableColumnsType } from "antd";
import { FC } from "react";
import { useParams } from "react-router-dom";

import { useGetDetailAppealQuery } from "@/entities/application/api/api.ts";
import { AGE_NAME, GENDER_NAME } from "@/shared/constants";
import { Table } from "@/shared/ui/table";

import styles from "./styles.module.scss";

interface DataType {
  id: number;
  fullName: string;
  typePassport: string;
  gender: string;
  dateBirth: string;
  citizenship: string;
  serial: string;
}

export const TicketsList: FC = () => {
  const { id: appealID } = useParams();

  if (!appealID) return null;

  const { data: appealDetail, isFetching } = useGetDetailAppealQuery(appealID);

  const listPassengers =
    appealDetail?.flight_appeal?.ticket?.[0]?.flight_details?.tickets[0]
      ?.passengers;

  const columns: TableColumnsType<DataType> = [
    { title: "№ билета", dataIndex: "id", key: "id" },
    { title: "Ф.И.О. пассажира", dataIndex: "fullName", key: "fullName" },
    { title: "Возраст", dataIndex: "age", key: "age" },
    { title: "Тип паспорта", dataIndex: "typePassport", key: "typePassport" },
    { title: "Пол", dataIndex: "gender", key: "gender" },
    { title: "День рождения", dataIndex: "dateBirth", key: "dateBirth" },
    { title: "Гражданство", dataIndex: "citizenship", key: "citizenship" },
    { title: "Серия документа", dataIndex: "serial", key: "serial" },
  ];

  const data: DataType[] | undefined = listPassengers?.map((passenger) => ({
    id: passenger.id,
    age: AGE_NAME[passenger?.age],
    fullName: `${passenger?.name?.last || ""} ${passenger?.name?.first || ""} ${
      passenger?.name?.middle || ""
    }`,
    typePassport: passenger?.document?.type,
    gender: GENDER_NAME[passenger?.gender],
    dateBirth: passenger?.birthdate,
    citizenship: passenger?.citizenship,
    serial: passenger?.document.num,
  }));

  console.log(data);

  return (
    <div className={styles.container}>
      <Table
        columns={columns}
        dataSource={data}
        loading={isFetching}
        // expandable={{
        //   expandedRowRender: (record: DataType) => {
        //     return (
        //       <div className={styles.additionalWrapper}>
        //         <DetailInformation title="Остаток" subTitle={record?.remains}/>
        //         <DetailInformation title="Оборот по ДТ" subTitle={record?.turnover_dt}/>
        //         <DetailInformation title="Оборот по КТ" subTitle={record?.turnover_kt}/>
        //         <DetailInformation title="Операция" subTitle={record?.operation}/>
        //         <DetailInformation title="Назначение платежа" subTitle={record?.purpose}/>
        //       </div>
        //     )
        //   },
        //   expandedRowClassName: () => {
        //     return styles.rowExpand;
        //   },
        //   expandIcon: (data) => {
        //     return (
        //       // @ts-ignore
        //       <span onClick={() => data?.onExpand(data?.record)}>
        //         <ArrowIcon
        //           type={data?.expanded ? "bottom" : "top"}
        //           className={clsx(data?.expanded ? styles.active : styles.default)}
        //         />
        //       </span>
        //     )
        //   }
        // }}
      />
    </div>
  );
};
