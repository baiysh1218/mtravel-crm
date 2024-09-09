import { clsx } from "clsx";
import { FC, ReactNode } from "react";

import { Loader } from "@/shared/ui/loader";

import styles from "./styles.module.scss";

interface Props {
  padding?: number;
  type?: "primary" | "secondary";
  children: ReactNode;
  isLoading?: boolean;
}

export const Paper: FC<Props> = ({
  children,
  padding = 20,
  type,
  isLoading,
}) => {
  return (
    <>
      <div
        className={clsx(styles.container, type && styles[type])}
        style={{ padding }}
      >
        {children}

        {isLoading ? (
          <div className={styles.loader}>
            <Loader />
          </div>
        ) : null}
      </div>
    </>
  );
};
