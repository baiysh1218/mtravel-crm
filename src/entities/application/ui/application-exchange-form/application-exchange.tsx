import TextArea from "antd/es/input/TextArea";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import {
  useGetDetailAppealQuery,
  useUpdateAppealDetailMutation,
} from "@/entities/application/api/api.ts";
import { AppealFlight, ChangeAppealData } from "@/entities/application/module";
import { ExchangeAppeal } from "@/entities/application/module/edit-appeal.ts";
import { AppIcon } from "@/shared/icons/app-icon";
import { AllIcons } from "@/shared/icons/app-icon/types.ts";
import { showNotification } from "@/shared/lib/showNotification.ts";
import { showPopup } from "@/shared/lib/showPopup";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Paper } from "@/shared/ui/paper";

import s from "./styles.module.scss";

interface Props {}

const onPrepareForm = (data?: AppealFlight) => {
  if (!data?.flight_appeal?.appeals_detail) return;

  const { trade_price_amount, penality_amount, commentary } =
    data?.flight_appeal?.appeals_detail;

  return { trade_price_amount, penality_amount, commentary };
};

export const ApplicationExchange: FC<Props> = () => {
  const { id: appealID } = useParams();

  if (!appealID) return null;

  const { data: appealDetail, isFetching } = useGetDetailAppealQuery(appealID);
  const [onAppealSubmit, statusAppeal] = useUpdateAppealDetailMutation();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExchangeAppeal>({ defaultValues: onPrepareForm(appealDetail) });

  const onSubmit = handleSubmit(async (data) => {
    const preparedData: ChangeAppealData<ExchangeAppeal> = {
      billing_id: String(appealDetail?.flight_appeal?.id),
      data: {
        commentary: data?.commentary,
        penality_amount: data?.penality_amount,
        trade_price_amount: data?.trade_price_amount,
      },
    };

    const resultPopUp = await showPopup({
      title: "Обмена билета",
      content: "Вы уверены что хотите обменять билет?",
      okText: "Продолжить",
      cancelText: "Отмена",
    });

    if (!resultPopUp) return;

    onAppealSubmit(preparedData)
      .unwrap()
      .then(() => {
        showNotification({ message: `Вы успешно создали заявку` });
      })
      .catch((error) => {
        showNotification({
          message: `Ошибка: ${JSON.stringify(error)}`,
          type: "error",
        });
      });
  });

  if (isFetching) return null;

  return (
    <section className={s.container}>
      <Paper isLoading={statusAppeal.isLoading}>
        <form onSubmit={onSubmit}>
          <p className={s.title}>Обмен</p>

          <div className={s.moneys}>
            <div className={s.input}>
              <Label label="Сумма возврата">
                <Input
                  type={"number"}
                  placeholder="Введите стоимость"
                  error={errors?.trade_price_amount}
                  rightIcon={
                    <AppIcon id={AllIcons.CURRENCY} className={s.icon} />
                  }
                  {...register("trade_price_amount", {
                    required: true,
                    pattern: /[0-9]/,
                  })}
                />
              </Label>
            </div>

            <div className={s.input}>
              <Label label="Сумма штрафа">
                <Input
                  type={"number"}
                  placeholder="Введите стоимость"
                  error={errors?.penality_amount}
                  rightIcon={
                    <AppIcon id={AllIcons.CURRENCY} className={s.icon} />
                  }
                  {...register("penality_amount", {
                    required: true,
                    pattern: /[0-9]/,
                  })}
                />
              </Label>
            </div>
          </div>

          <Controller
            control={control}
            rules={{ required: true }}
            name={`commentary`}
            render={({ field }) => (
              <TextArea
                value={field.value}
                className={s.textarea}
                placeholder={"Напишите комментарии"}
                status={errors?.commentary && "error"}
                onChange={(value) => {
                  field.onChange(value.currentTarget?.value);
                }}
              />
            )}
          />

          <div className={s.button}>
            <Button>Отправить</Button>
          </div>
        </form>
      </Paper>
    </section>
  );
};
