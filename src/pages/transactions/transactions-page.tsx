import { TransactionHeader } from "@/widgets/transaction";
import { TransactionList } from "@/widgets/transaction";

import s from "./styles.module.scss";

export const TransactionsPage = () => {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <TransactionHeader />
      </div>

      <div className={s.body}>
        <TransactionList />
      </div>
    </div>
  );
};
