import { FC } from "react";

import styles from "./styles.module.scss";

interface Props {
  title?: string;
  subTitle?: string;
}

export const DetailInformation: FC<Props> = ({ title, subTitle }) => {
  return (
    <div className={styles.container}>
      <span>{title}:</span>
      <p>{subTitle}</p>
    </div>
  );
};
