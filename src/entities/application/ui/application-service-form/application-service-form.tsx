import TextArea from "antd/es/input/TextArea";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import {
  useGetDetailAppealQuery,
  useUpdateAppealDetailMutation,
} from "@/entities/application/api/api.ts";
import {
  ChangeAppealData,
  ExchangeAppeal,
} from "@/entities/application/module/edit-appeal.ts";
import { prepareDataRenderForm } from "@/entities/application/ui/application-service-form";
import { Props } from "@/entities/application/ui/application-service-form";
import { showNotification } from "@/shared/lib/showNotification.ts";
import { Button } from "@/shared/ui/button";
import { Paper } from "@/shared/ui/paper";

import s from "./styles.module.scss";
import { PassengerInfo } from "./ui/passenger-info";

export interface Form {
  commentary: string;
  listPassengers: Omit<Props, "register" | "control">[];
}

export const ApplicationServiceForm: FC = () => {
  const { id: appealID } = useParams();

  if (!appealID) return null;

  const { data: appealDetail, isFetching } = useGetDetailAppealQuery(appealID);
  const [onAppeal, appealState] = useUpdateAppealDetailMutation();

  if (isFetching && appealDetail) return null;

  const passengersAppeal = appealDetail?.flight_appeal?.appeals_detail;
  const passengersTicket =
    appealDetail?.flight_appeal?.ticket?.[0]?.flight_details?.tickets?.[0]
      .passengers;

  const listPassengersPrepared = prepareDataRenderForm({
    passengersAppeal,
    passengersTicket,
    topic: appealDetail?.flight_appeal.topic,
  });

  const {
    control,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: { listPassengers: listPassengersPrepared },
  });

  const onSubmit = handleSubmit((data) => {
    const preparedData: ChangeAppealData<ExchangeAppeal> = {
      billing_id: String(appealDetail?.flight_appeal?.id),
      data: {
        commentary: data?.commentary,
        passengers: data?.listPassengers?.map((passenger) => ({
          status: passenger.status,
          passenger_key: passenger.key,
          price_of_service: passenger?.price,
        })),
      },
    };

    onAppeal(preparedData)
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

  const listPassengers = getValues("listPassengers");

  return (
    <div className={s.container}>
      <Paper isLoading={appealState.isLoading}>
        <form onSubmit={onSubmit}>
          <p className={s.title}>Доп. услуги</p>

          {listPassengers?.map((item, index) => (
            <PassengerInfo
              {...item}
              index={index}
              key={"pas" + index}
              register={register}
              control={control}
            />
          ))}

          <div className={s.commentary}>
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
          </div>

          <div className={s.button}>
            <Button>Отправить</Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};
