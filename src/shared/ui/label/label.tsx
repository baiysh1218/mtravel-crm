import { clsx } from "clsx";
import { FC, ReactNode } from "react";

import styles from "./styles.module.scss";

interface Props {
  label?: string;
  children: ReactNode;
  type?: "lightGrey" | "lightBlue";
  size?: "nr" | "sm";
}

export const Label: FC<Props> = ({
  label,
  children,
  size = "nr",
  type = "lightBlue",
}) => {
  return (
    <div className={styles.container}>
      {label ? (
        <span className={clsx(styles[type], styles[size], styles.label)}>
          {label}
        </span>
      ) : null}
      {children}
    </div>
  );
};
