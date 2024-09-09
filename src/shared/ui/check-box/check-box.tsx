import { clsx } from "clsx";
import { FC } from "react";

import styles from "./styles.module.scss";

interface Props {
  checked?: boolean;
  onClick?: () => void;
  label?: string;
}

export const CheckBox: FC<Props> = ({ checked = false, onClick, label }) => {
  return (
    <div onClick={onClick} className={styles.container}>
      <div
        className={clsx(styles.checkBox, {
          [styles.checked]: checked,
          [styles.unchecked]: !checked,
        })}
      />

      {label ? <span className={styles.label}>{label}</span> : null}
    </div>
  );
};
