import { FC } from "react";

import {
  CurrentStatusTransaction,
  LIST_TRANSACTION_STATUS,
} from "@/shared/constants";
import { formatShowPrice } from "@/shared/helper/formatShowPrice.ts";
import { AppIcon } from "@/shared/icons/app-icon";
import { AllIcons } from "@/shared/icons/app-icon/types.ts";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Paper } from "@/shared/ui/paper";
import { StatusTransaction } from "@/shared/ui/status-transaction";

import s from "./styles.module.scss";

interface Props {
  paymentStatus?: number;
  ticketPrise?: string;
  listPassenger?: RenderFieldPassenger[];
}

interface RenderFieldProp {
  value?: string;
  label?: string;
}

interface RenderFieldPassenger {
  title?: string;
  fieldValue?: RenderFieldProp;
}

const RenderField: FC<RenderFieldProp> = ({ value, label }) => {
  return (
    <Label label={label}>
      <Input
        readOnly
        borderNone
        height={"sm"}
        value={formatShowPrice(value) || 0}
        rightIcon={
          <AppIcon
            id={AllIcons.CURRENCY}
            className={s.icon}
            width={16}
            height={16}
          />
        }
      />
    </Label>
  );
};

const RenderPassenger: FC<RenderFieldPassenger> = ({ fieldValue, title }) => {
  return (
    <div className={s.wrapperPassenger}>
      <p className={s.title}>{title}</p>
      <div className={s.wrapper}>
        <RenderField
          label={fieldValue?.label || "Стоимость билета"}
          {...fieldValue}
        />
      </div>
    </div>
  );
};

export const TransactionOfTicket: FC<Props> = (props) => {
  const { paymentStatus, ticketPrise, listPassenger } = props;

  const statusOfPayment = LIST_TRANSACTION_STATUS[
    paymentStatus as keyof object
  ] as CurrentStatusTransaction;
  return (
    <Paper>
      <div className={s.container}>
        <p className={s.title}>Стоимость билетов</p>

        <div className={s.head}>
          {paymentStatus ? (
            <div className={s.field}>
              <Label label="Статус">
                <Paper padding={10} type="secondary">
                  <StatusTransaction
                    label={statusOfPayment?.label}
                    color={statusOfPayment?.color}
                  />
                </Paper>
              </Label>
            </div>
          ) : null}

          {ticketPrise ? (
            <div className={s.field}>
              <Label label="Стоимость билета">
                <div className={s.ticketPrice}>
                  {formatShowPrice(ticketPrise)}

                  <AppIcon
                    id={AllIcons.CURRENCY}
                    className={s.icon}
                    width={16}
                    height={16}
                  />
                </div>
              </Label>
            </div>
          ) : null}
        </div>

        {listPassenger?.map((item, index) => (
          <div className={s.field} key={"pas" + index}>
            <RenderPassenger {...item} />
          </div>
        ))}
      </div>
    </Paper>
  );
};
