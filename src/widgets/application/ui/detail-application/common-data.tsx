import { FC } from "react";
import { useParams } from "react-router-dom";

import { useGetDetailAppealQuery } from "@/entities/application/api/api.ts";
import { ApplicationExchange } from "@/entities/application/ui/application-exchange-form";
import { ApplicationRefund } from "@/entities/application/ui/application-refund-form";
import { ApplicationServiceForm } from "@/entities/application/ui/application-service-form";
import { OtherTransactions } from "@/entities/transaction/ui/other-transactions";
import { TransactionOfTicket } from "@/entities/transaction/ui/transaction-of-ticket";
import { ApplicationComment } from "@/features/application/detail-application";
import { TYPE_APPLICATION } from "@/shared/constants";
import { Paper } from "@/shared/ui/paper";
import { TextInformation } from "@/shared/ui/text-information";
import { getPassengersPriceOfTicket } from "@/widgets/application/lib";
import { ChatCreateRequest } from "@/widgets/chat-create-request";

import styles from "./common-data.module.scss";

export const CommonData: FC = () => {
  const { id: appealID } = useParams();

  if (!appealID) return null;

  const { data: appealDetail, isFetching } = useGetDetailAppealQuery(appealID);

  const paymentStatus =
    appealDetail?.flight_appeal?.ticket?.[0]?.ticket_transaction_status?.status;
  const priceTicket = appealDetail?.flight_appeal.ticket?.[0]?.price || "";
  const listTransaction = getPassengersPriceOfTicket(
    appealDetail?.flight_appeal?.ticket?.[0],
  );

  const renderForm = () => {
    switch (appealDetail?.topic) {
      case TYPE_APPLICATION.REFUND:
        return <ApplicationRefund />;
      case TYPE_APPLICATION.EXCHANGE:
        return <ApplicationExchange />;
      case TYPE_APPLICATION.ADDITIONAL_SERVICE:
        return <ApplicationServiceForm />;
      default:
        return;
    }
  };

  if (isFetching) return null;

  return (
    <>
      <div className={styles.information}>
        <div className={styles.left}>{renderForm()}</div>

        <div className={styles.center}>
          <div className={styles.block}>
            <Paper>
              <div className={styles.block}>
                <TextInformation
                  title="Обращение"
                  descriptions={appealDetail?.details}
                />
              </div>

              {/*<div className={styles.block}>*/}
              {/*  <p className={styles.title}>Прикрепленные фото</p>*/}
              {/*  <div className={styles.imagesWrapp}>*/}
              {/*    {*/}
              {/*      new Array(3).fill(0).map((_, index) => (*/}
              {/*        <ImageBlock key={"img" + index} image={IMAGE}/>*/}
              {/*      ))*/}
              {/*    }*/}
              {/*  </div>*/}
              {/*</div>*/}
            </Paper>
          </div>

          <div className={styles.block}>
            <ApplicationComment commentary={appealDetail?.commentary} />
          </div>
        </div>

        <div className={styles.right}>
          <TransactionOfTicket
            listPassenger={listTransaction}
            ticketPrise={priceTicket}
            paymentStatus={paymentStatus}
          />
        </div>

        <div className={styles.chat}>
          <ChatCreateRequest />
        </div>
      </div>

      <OtherTransactions />
    </>
  );
};
