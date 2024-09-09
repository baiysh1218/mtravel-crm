import debounce from "debounce";
import { BaseSyntheticEvent, FC, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getParams } from "@/pages/main-page/lib";
import { formatDate } from "@/shared/helper/formatDate.ts";
import { AppIcon } from "@/shared/icons/app-icon";
import { AllIcons } from "@/shared/icons/app-icon/types.ts";
import { SearchInput } from "@/shared/search-input";
import { Button } from "@/shared/ui/button";
import { DatePicker } from "@/shared/ui/date-picker";

import s from "./styles.module.scss";

export interface Filter {
  input?: string;
}

export interface OnChangeValues {
  fromDate?: Date | null;
  toDate?: Date | null;
  search?: string;
  page?: string;
  topic?: string;
  status?: string;
}

interface Props {}

export const Filter: FC<Props> = () => {
  const [param, setParams] = useSearchParams();

  const search = param.get("search");

  const { toDate, fromDate } = getParams();

  const isCanRefresh = !!fromDate?.length;

  const [filterValues, setFilterValues] = useState<OnChangeValues>({
    fromDate: fromDate ? new Date(fromDate) : undefined,
    toDate: toDate ? new Date(toDate) : undefined,
  });

  const onChangeDate = (values: [{ $d: Date }, { $d: Date }] | null) => {
    if (values?.[0]?.$d && values?.[1]?.$d) {
      const preparedDateFrom = values?.[0]?.$d
        ? formatDate(values?.[0]?.$d, "YYYY-MM-DD")
        : "";
      const preparedDateTo = values?.[1]?.$d
        ? formatDate(values?.[1]?.$d, "YYYY-MM-DD")
        : "";

      setParams((data) => {
        data.set("fromDate", preparedDateFrom);
        data.set("toDate", preparedDateTo);
        data.set("page", "1");

        return data;
      });
    }

    setFilterValues((data) => ({
      ...data,
      toDate: values?.[0]?.$d,
      fromDate: values?.[1]?.$d,
    }));
  };

  const onClearHandler = () => {
    setFilterValues({});
    setParams();
  };

  const onInputDate = (e: BaseSyntheticEvent) => {
    const inputValue = e?.target?.value || "";

    setParams((data) => {
      data.set("search", inputValue);
      data.set("page", "1");

      return data;
    });
  };

  return (
    <section className={s.container}>
      <div className={s.input}>
        <SearchInput
          defaultValue={search || ""}
          onChange={debounce(onInputDate, 1000)}
        />
      </div>

      <div className={s.input}>
        <DatePicker
          value={[filterValues?.fromDate, filterValues?.toDate]}
          className={s.datePicker}
          onChange={onChangeDate}
        />
      </div>

      {isCanRefresh ? (
        <div className={s.button}>
          <Button
            variant="sm"
            type="secondary"
            onClick={onClearHandler}
            paddingVariant="paddingSmall"
          >
            <span className={s.value}>
              <AppIcon
                width={16}
                height={16}
                id={AllIcons.CROSS}
                style={{ height: 16, marginRight: "6px" }}
              />
              Сброс
            </span>
          </Button>
        </div>
      ) : null}
    </section>
  );
};
