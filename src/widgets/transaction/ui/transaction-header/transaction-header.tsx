import { FC } from "react";

import { UserProfile } from "@/entities/profile/ui/user-profile";
import { Filter } from "@/features/filter-list/ui/filter";
import { StatusesTransaction } from "@/features/transaction/statuses-transaction/";
import { Paper } from "@/shared/ui/paper";

import s from "./styles.module.scss";

interface Props {}

export const TransactionHeader: FC<Props> = () => {
  return (
    <Paper>
      <div className={s.container}>
        <div className={s.header}>
          <h1>Транзакции</h1>

          <UserProfile isGrey />
        </div>

        <StatusesTransaction />

        <div className={s.filter}>
          <Filter />
        </div>
      </div>
    </Paper>
  );
};
