import { FC } from "react";

import styles from "./styles.module.scss";

interface Props {
  image?: string;
}

export const ImageBlock: FC<Props> = ({ image }) => {
  return (
    <div className={styles.container}>
      <img src={image} alt="" />
    </div>
  );
};
