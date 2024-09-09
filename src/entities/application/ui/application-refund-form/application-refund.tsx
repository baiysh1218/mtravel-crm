import TextArea from "antd/es/input/TextArea";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import {
  useGetDetailAppealQuery,
  useOnRefundTicketMutation,
} from "@/entities/application/api/api.ts";
import { AppealFlight } from "@/entities/application/module";
import { RefundTicket } from "@/entities/application/module/edit-appeal.ts";
import { AppIcon } from "@/shared/icons/app-icon";
import { AllIcons } from "@/shared/icons/app-icon/types.ts";
import { showNotification } from "@/shared/lib/showNotification.ts";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Paper } from "@/shared/ui/paper";

import s from "./styles.module.scss";

interface Props {}

const onPrepareForm = (data?: AppealFlight) => {
  return {
    appeals_detail: {
      commentary: data?.flight_appeal?.appeals_detail?.commentary,
      penality_amount: data?.flight_appeal?.appeals_detail?.penality_amount,
    },
  };
};

export const ApplicationRefund: FC<Props> = () => {
  const { id: appealID } = useParams();

  if (!appealID) return null;

  const { data: appealDetail, isFetching } = useGetDetailAppealQuery(appealID);
  const [onRefundMoney, statusRefund] = useOnRefundTicketMutation();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RefundTicket>({ defaultValues: onPrepareForm(appealDetail) });

  const onSubmit = handleSubmit((data) => {
    const preparedData: RefundTicket = {
      user_id: String(appealDetail?.user.id || ""),
      billing_number: String(appealDetail?.flight_appeal?.billing_number || ""),
      amount: data?.amount,
      appeals_detail: {
        commentary: data?.appeals_detail?.commentary,
        penality_amount: data.appeals_detail?.penality_amount,
      },
    };

    onRefundMoney(preparedData)
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
      <Paper isLoading={statusRefund.isLoading}>
        <form onSubmit={onSubmit}>
          <p className={s.title}>Возврат</p>

          <div className={s.moneys}>
            <div className={s.input}>
              <Label label="Сумма возврата">
                <Input
                  type={"number"}
                  placeholder="Введите стоимость"
                  error={errors?.amount || false}
                  rightIcon={
                    <AppIcon id={AllIcons.CURRENCY} className={s.icon} />
                  }
                  {...register("amount", { required: true, pattern: /[0-9]/ })}
                />
              </Label>
            </div>

            <div className={s.input}>
              <Label label="Сумма штрафа">
                <Input
                  type="number"
                  placeholder="Введите стоимость"
                  error={errors?.appeals_detail?.penality_amount}
                  {...register("appeals_detail.penality_amount", {
                    required: true,
                    pattern: /[0-9]/,
                  })}
                  rightIcon={
                    <AppIcon id={AllIcons.CURRENCY} className={s.icon} />
                  }
                />
              </Label>
            </div>
          </div>

          <Controller
            control={control}
            rules={{ required: true }}
            name={`appeals_detail.commentary`}
            render={({ field }) => (
              <TextArea
                value={field.value}
                className={s.textarea}
                placeholder={"Напишите комментарии"}
                status={errors.appeals_detail?.commentary && "error"}
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
