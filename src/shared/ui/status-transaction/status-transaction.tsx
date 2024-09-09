import { FC } from "react";

import { CurrentStatusTransaction } from "@/shared/constants";

import s from "./styles.module.scss";

export const StatusTransaction: FC<CurrentStatusTransaction> = ({
  label,
  color,
}) => {
  return (
    <div className={s.container}>
      <span className={s.color} style={{ background: color }} />

      <span color={s.name} style={{ color }}>
        {label}
      </span>
    </div>
  );
};
