import { FC } from "react";

import styles from "./styles.module.scss";

interface Props {
  label?: string;
  value?: string;
}

export const LabelText: FC<Props> = ({ label, value }) => {
  return (
    <div className={styles.container}>
      <span>{label}</span>

      <p>{value}</p>
    </div>
  );
};
