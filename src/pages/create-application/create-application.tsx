import { FC } from "react";
import { useSearchParams } from "react-router-dom";

import { FlightDetailInformation } from "@/entities/flight/ui/flight-detail-information";
import { FlightsInformation } from "@/entities/flight/ui/flights-information";
import { useGetDetailInfoByNumberQuery } from "@/entities/ticket/api";
import { TransactionOfTicket } from "@/entities/transaction/ui/transaction-of-ticket";
import styles from "@/pages/detail-application/styles.module.scss";
import { HeaderBreadcrumbs } from "@/shared/header-breadcrumbs";
import { ItemBreadCrumbs } from "@/shared/ui/breadcrumbs/breadcrumbs.tsx";
import { getPassengersPriceOfTicket } from "@/widgets/application/lib";
import { CreateApplication } from "@/widgets/create-application/ui/create-application";

import s from "./styles.module.scss";

interface Props {}

const listBread: ItemBreadCrumbs[] = [
  {
    name: "Главная",
    link: "/",
  },
  {
    name: "Заявка",
  },
];

const ShowTransactionByPassenger = ({
  searchedBilling,
}: {
  searchedBilling: string;
}) => {
  const { data } = useGetDetailInfoByNumberQuery(searchedBilling);

  const paymentStatus = data?.ticket_transaction_status?.status;
  const priceTicket = data?.price;
  const listTransaction = getPassengersPriceOfTicket(data);

  return (
    <TransactionOfTicket
      listPassenger={listTransaction}
      ticketPrise={priceTicket}
      paymentStatus={paymentStatus}
    />
  );
};

export const CreateApplicationPage: FC<Props> = () => {
  const [param] = useSearchParams();

  const searchedBilling = param.get("searched");

  return (
    <>
      <div className={styles.bread}>
        <HeaderBreadcrumbs listBread={listBread} />
      </div>

      <section className={s.container}>
        <div className={s.form}>
          <CreateApplication />
        </div>

        {searchedBilling ? (
          <div className={s.information}>
            <FlightsInformation />
            <FlightDetailInformation />
          </div>
        ) : null}

        <div className={s.information}>
          {searchedBilling ? (
            <ShowTransactionByPassenger searchedBilling={searchedBilling} />
          ) : null}
        </div>
      </section>
    </>
  );
};
