import { clsx } from "clsx";
import { FC } from "react";

import LetterIcon from "@/assets/icons/letter_icon.svg";
import PhoneIcon from "@/assets/icons/phone_icon.svg";

import styles from "./buttons-action.module.scss";

interface Props {
  phone?: string;
  mail?: string;
}

export const ButtonsAction: FC<Props> = ({ phone, mail }) => {
  return (
    <div className={styles.container}>
      {phone ? (
        <button className={clsx(styles.button, styles.phone)}>
          <img src={PhoneIcon} alt="" />
        </button>
      ) : null}

      {mail ? (
        <button className={clsx(styles.button, styles.letter)}>
          <img src={LetterIcon} alt="" />
        </button>
      ) : null}
    </div>
  );
};
