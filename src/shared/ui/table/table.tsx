import { Table as AntTable, TableProps } from "antd";
import { FC } from "react";

import styles from "./styles.module.scss";

const pageSizeOptions = [15, 30, 50];

interface AppTableProps extends TableProps<any> {
  error?: any;
}

export const Table: FC<AppTableProps> = (props) => {
  const { pagination, ...restProps } = props;

  return (
    <AntTable
      {...restProps}
      rootClassName={styles.wrapper}
      pagination={pagination ? { ...pagination, pageSizeOptions } : false}
    />
  );
};
