import { clsx } from "clsx";
import { FC } from "react";

import styles from "./styles.module.scss";

interface Props {
  type?: "left" | "right" | "top" | "bottom";
  className?: string;
}

export const ArrowIcon: FC<Props> = ({ type = "left", className }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(styles[type], className)}
    >
      <path
        d="M10 12L6 8L10 4"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
};
