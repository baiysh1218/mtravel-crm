import { DatePicker as AntDatePicker } from "antd";
import locale from "antd/es/locale/ru_RU";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import React, { useMemo } from "react";

import styles from "./styles.module.scss";

const { RangePicker } = AntDatePicker;

export interface DatePickerProps {
  value?: any;
  icon?: React.ReactNode;
  inputSize?: "small" | "medium";
  onChange?: (date: any) => void;
  placeholder?: string;
  showRange?: boolean;
  disabled?: boolean;
  disabledDate?: any;
  className?: string;
  allowClear?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  icon,
  value,
  inputSize = "medium",
  onChange,
  placeholder = "Выберите дату",
  showRange,
  disabled,
  disabledDate,
  className,
  allowClear = true,
  ...props
}) => {
  const getValue = useMemo(() => {
    if (Array.isArray(value)) {
      const start = value[0] ? dayjs(value[0]) : undefined;
      const end = value[1] ? dayjs(value[1]) : undefined;

      if (start?.isValid() && end?.isValid()) {
        return [start, end];
      }

      return null;
    }

    return value;
  }, [value]);

  function isDateDisabled(current: any) {
    return (
      (current && current > dayjs().endOf("day")) ||
      (disabledDate && disabledDate(current))
    );
  }

  return (
    <div className={styles.container}>
      <RangePicker
        locale={locale.DatePicker}
        className={className}
        disabledDate={isDateDisabled}
        format="DD-MM-YYYY"
        value={getValue}
        onChange={onChange}
        onBlur={() => {}}
        onFocus={() => {}}
        disabled={disabled}
        allowClear={allowClear}
        {...props}
      />
    </div>
  );
};
