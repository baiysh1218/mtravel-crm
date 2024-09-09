import { FC } from "react";
import { Control, Controller, UseFormRegister } from "react-hook-form";

import { LIST_STATUS_APPLICATION } from "@/shared/constants";
import { AppIcon } from "@/shared/icons/app-icon";
import { AllIcons } from "@/shared/icons/app-icon/types.ts";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Select } from "@/shared/ui/select";

import { Form } from "../../application-service-form.tsx";
import s from "./styles.module.scss";

export interface Props {
  key?: string;
  index?: number;
  fullName?: string;
  serviceName?: string;
  status?: string;
  price?: string;
  register: UseFormRegister<Form>;
  control: Control<Form>;
}

export const PassengerInfo: FC<Props> = (props) => {
  const { register, control, index, ...propsFields } = props;

  return (
    <Label label={`Пассажир №${(index || 0) + 1}`}>
      <div className={s.container}>
        <div className={s.input}>
          <Label label="ФИО">
            <Input value={propsFields.fullName} readOnly height={"sm"} />
          </Label>
        </div>

        <div className={s.input}>
          <Label label="Наименование доп. услуги">
            <Input value={propsFields.serviceName} readOnly height={"sm"} />
          </Label>
        </div>

        <div className={s.input}>
          <Label label="Статус">
            <Controller
              control={control}
              rules={{ required: true }}
              name={`listPassengers.${index || 0}.status` as keyof Form}
              render={({ field }) => (
                <Select
                  value={field.value}
                  options={LIST_STATUS_APPLICATION}
                  style={{ height: 32, width: "100%" }}
                  onChange={(value) => field.onChange(value)}
                  optionRender={(option) => (
                    <p className={s.option}>
                      <span
                        className={s.indicator}
                        style={{ background: option?.data?.color }}
                      />
                      <span className={s.label}>{option.label}</span>
                    </p>
                  )}
                />
              )}
            />
          </Label>
        </div>

        <div className={s.input}>
          <Label label="Стоимость услуги">
            <Input
              height={"sm"}
              type={"number"}
              placeholder="Введите смоимость"
              {...register(`listPassengers.${index || 0}.price` as keyof Form, {
                required: true,
                pattern: /[0-9]/,
              })}
              rightIcon={<AppIcon id={AllIcons.CURRENCY} className={s.icon} />}
            />
          </Label>
        </div>
      </div>
    </Label>
  );
};
