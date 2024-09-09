import { FC } from "react";

import s from "./styles.module.scss";

interface Props {
  left?: string;
  right?: string;
}

export const ApplicationDetailTransfer: FC<Props> = ({ left, right }) => {
  return (
    <div className={s.container}>
      <span>{left}</span> {right}
    </div>
  );
};
