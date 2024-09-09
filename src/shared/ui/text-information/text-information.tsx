import { FC } from "react";

import styles from "./styles.module.scss";

interface Props {
  title?: string;
  descriptions?: string;
}

export const TextInformation: FC<Props> = ({ title, descriptions }) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: descriptions || "" }}
      />
    </div>
  );
};
