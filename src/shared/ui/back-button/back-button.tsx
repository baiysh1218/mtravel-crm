import { FC } from "react";

import ArrowIcon from "@/assets/icons/back_arrow.svg";

import styles from "./styles.module.scss";

interface Props {
  onClick?: () => void;
}

export const BackButton: FC<Props> = ({ onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.icon}>
        <img src={ArrowIcon} alt="" />
      </div>
      Назад
    </div>
  );
};
