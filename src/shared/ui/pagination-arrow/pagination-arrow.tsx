import { FC } from "react";

import { ArrowIcon } from "@/shared/icons/arrow-icon";
import { Button } from "@/shared/ui/button";

import styles from "./styles.module.scss";

interface Props {
  onPrevPage?(): void;

  onNextPage?(): void;
}

export const PaginationArrow: FC<Props> = ({ onNextPage, onPrevPage }) => {
  return (
    <div className={styles.container}>
      <Button className={styles.button} onClick={onPrevPage}>
        <ArrowIcon />
      </Button>

      <Button className={styles.button} onClick={onNextPage}>
        <ArrowIcon type="right" />
      </Button>
    </div>
  );
};
