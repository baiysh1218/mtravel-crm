import { FC, useEffect, useState } from "react";

import { PaginationPageModel } from "@/shared/models/pagination.ts";

import styles from "./styles.module.scss";

export const PaginationCurrentPage: FC<PaginationPageModel> = ({
  page,
  countPage,
  onChange,
}) => {
  const [value, setValue] = useState<number | string>(page || 0);

  function handleEnterPress(e: any) {
    if (e.key === "Enter") {
      if ((countPage || 0) > parseInt(e.target.value)) {
        onChange?.(e.target.value);
      } else if (parseInt(e.target.value) < 0) {
        onChange?.(1);
      } else {
        onChange?.(countPage || 0);
      }
    }
  }

  useEffect(() => {
    setValue(page || 0);
  }, [page]);

  return (
    <div className={styles.container}>
      Страница
      <input
        value={value}
        type={"number"}
        onKeyDown={handleEnterPress}
        className={styles.currentPage}
        onChange={(e) => setValue(e.target.value)}
      />
      из {countPage || 1}
    </div>
  );
};
