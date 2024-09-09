import { Select as AntSelect, SelectProps } from "antd";
import { FC, useState } from "react";

import { AppIcon } from "@/shared/icons/app-icon";
import { AllIcons } from "@/shared/icons/app-icon/types.ts";

import s from "./styles.module.scss";

interface Props extends SelectProps {
  onChange?: (data?: DefaultOptionType[]) => void;
}

interface DefaultOptionType {
  label: string;
  value: string;
}

export const MultiSelect: FC<Props> = (props) => {
  const { onChange, ...refProps } = props;
  const [selected, onSelected] = useState<DefaultOptionType[]>();

  const onRemoveItem = (data: DefaultOptionType) => {
    const newListSelected = selected?.filter(
      (item) => item.value !== data.value,
    );

    onSelected(newListSelected);

    onChange?.(newListSelected);
  };

  const onSelectValues = (data?: DefaultOptionType[]) => {
    onSelected(data);

    onChange?.(data);
  };

  return (
    <div>
      <div className={s.select}>
        <AntSelect
          {...refProps}
          value={selected}
          mode={"multiple"}
          showSearch={false}
          style={{ width: "100%" }}
          tagRender={() => <span />}
          onChange={(_, option) => {
            const newOption: DefaultOptionType[] = option?.map(
              (opt: DefaultOptionType) => ({
                label: opt.label,
                value: opt.value,
              }),
            );

            onSelectValues(newOption);
          }}
        />
      </div>

      {selected?.map((item, index) => (
        <div className={s.itemService} key={"service" + index}>
          {item.label}

          <button className={s.cross}>
            <AppIcon
              className={s.icon}
              id={AllIcons.CROSS}
              onClick={() => onRemoveItem(item)}
            />
          </button>
        </div>
      ))}
    </div>
  );
};
