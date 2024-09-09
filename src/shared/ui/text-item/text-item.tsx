import { FC } from "react";

import styles from "./styles.module.scss";

interface Props {
  label?: string;
  value?: string;
}

export const TextItem: FC<Props> = ({ label, value }) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>{label}</span>

      <span className={styles.value}>{value}</span>
    </div>
  );
};
