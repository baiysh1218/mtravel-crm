import { FC } from "react";

import { useGetManagersQuery } from "@/entities/managers/api/api.ts";
import { Label } from "@/shared/ui/label";
import { Select } from "@/shared/ui/select";

import s from "./styles.module.scss";

interface Props {
  responsible?: number;
  onChangeManager?: (idManager: number) => void;
}

export const SelectOperator: FC<Props> = ({ onChangeManager, responsible }) => {
  const { data, isLoading } = useGetManagersQuery();

  if (isLoading) return null;

  return (
    <div className={s.container}>
      <Label label="Оператор">
        <span className={s.select}>
          <Select
            style={{ width: 250 }}
            onChange={onChangeManager}
            defaultValue={responsible}
            placeholder="Действующий оператор"
            options={data?.map((manager) => ({
              label: `${manager.last_name} ${manager.first_name}`,
              value: manager.id,
            }))}
          />
        </span>
      </Label>
    </div>
  );
};
