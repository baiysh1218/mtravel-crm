import { clsx } from "clsx";
import { FC, HTMLProps, ReactNode } from "react";

import styles from "./styles.module.scss";

interface Props extends HTMLProps<HTMLButtonElement> {
  type?: "primary" | "secondary" | "third";
  variant?: "nr" | "sm" | "lr";
  paddingVariant?: "paddingNorm" | "paddingSmall" | "paddingLarge";
  children: ReactNode;
}

export const Button: FC<Props & HTMLProps<HTMLButtonElement>> = ({
  type = "primary",
  variant = "nr",
  paddingVariant = "paddingNorm",
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        styles[type],
        styles[variant],
        styles[paddingVariant],
        styles.button,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

Button.displayName = "Button";
