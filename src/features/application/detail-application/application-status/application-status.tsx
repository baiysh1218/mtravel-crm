import { SelectProps } from "antd";
import { FC } from "react";

import { REQUEST_STATUS, REQUEST_STATUS_COLOR } from "@/shared/constants";
import { Label } from "@/shared/ui/label";
import { Select } from "@/shared/ui/select";
import { StatusTransaction } from "@/shared/ui/status-transaction";

import styles from "./styles.module.scss";

interface Props extends SelectProps {}

export const ApplicationStatus: FC<Props> = ({ options, ...props }) => {
  return (
    <Label label="Статус">
      <span className={styles.select}>
        <Select
          {...props}
          options={options}
          style={{ width: 200 }}
          placeholder="Статус заявки"
          labelRender={(data) => {
            const colorStatus =
              REQUEST_STATUS_COLOR[data.key as REQUEST_STATUS];

            return (
              <StatusTransaction label={`${data.label}`} color={colorStatus} />
            );
          }}
          optionRender={(option) => (
            <p className={styles.option}>
              <span
                className={styles.indicator}
                style={{ background: option?.data?.color }}
              />
              <span className={styles.label}>{option.label}</span>
            </p>
          )}
        />
      </span>
    </Label>
  );
};
