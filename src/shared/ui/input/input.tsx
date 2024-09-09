import { clsx } from "clsx";
import { HTMLProps, ReactNode, forwardRef } from "react";
import { FieldError } from "react-hook-form";

import styles from "./styles.module.scss";

export interface Props extends HTMLProps<HTMLInputElement> {
  height?: "nr" | "sm";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  borderNone?: boolean;
  leftOnClick?: () => void;
  rightOnClick?: () => void;
  error?: FieldError | boolean;
  variant?: "lightBlue" | "lightGrey";
}

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      error,
      leftIcon,
      rightIcon,
      leftOnClick,
      rightOnClick,
      borderNone = false,
      height = "nr",
      variant = "lightBlue",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={clsx(
          styles.container,
          styles[height],
          styles[variant],
          borderNone && styles.borderNone,
          error && styles.errorField,
        )}
      >
        {leftIcon ? (
          <span className={styles.left} onClick={leftOnClick}>
            {" "}
            {leftIcon}{" "}
          </span>
        ) : null}

        <input className={clsx(styles.input)} {...props} ref={ref} />

        {rightIcon ? (
          <span className={styles.right} onClick={rightOnClick}>
            {" "}
            {rightIcon}{" "}
          </span>
        ) : null}
      </div>
    );
  },
);
