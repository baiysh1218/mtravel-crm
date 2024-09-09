import { clsx } from "clsx";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

import { useGetAppealSubjectsQuery } from "@/entities/application/api/api.ts";
import { KeyValue } from "@/entities/application/module";
import { useGetDetailInfoByNumberQuery } from "@/entities/ticket/api";
import { TYPE_APPLICATION } from "@/shared/constants";
import { Button } from "@/shared/ui/button";
import { CheckBox } from "@/shared/ui/check-box";
import { Label } from "@/shared/ui/label";
import { Select } from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";
import { UploadFiles } from "@/shared/ui/upload-files";

import s from "./styles.module.scss";

enum TYPE_APPLICATION_CREATE {
  "REFUND" = TYPE_APPLICATION.REFUND,
  "EXCHANGE" = TYPE_APPLICATION.EXCHANGE,
  "OTHER" = TYPE_APPLICATION.OTHER,
}

interface Props {
  typeAppeal: string;
  onCreate?: (data: FormCreateAppeal) => void;
}

export interface FormCreateAppeal {
  topic: string;
  subject: string;
  details: string;
  passengers: string[];
  files: File[];
}

const applicationDataMap = {
  [TYPE_APPLICATION_CREATE.EXCHANGE]: "trade_ticket_subjects",
  [TYPE_APPLICATION_CREATE.REFUND]: "refund_ticket_subjects",
  [TYPE_APPLICATION_CREATE.OTHER]: "other_subjects",
};

export const ApplicationCommonCreate: FC<Props> = ({
  typeAppeal,
  onCreate,
}) => {
  const [param] = useSearchParams();

  const searchedBilling = param.get("searched");

  if (!searchedBilling) return null;

  const { data } = useGetDetailInfoByNumberQuery(searchedBilling);
  const { data: dataSubjects } = useGetAppealSubjectsQuery();

  const listPassengers = data?.flight_details.tickets[0]?.passengers;

  const listTopics: KeyValue[] | [] =
    dataSubjects?.[0]?.[applicationDataMap?.[typeAppeal as keyof object]] || [];

  const {
    control,
    getValues,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCreateAppeal>({ defaultValues: { passengers: [] } });

  const onSubmit = handleSubmit((data) => {
    onCreate?.(data);
  });

  useEffect(() => {
    const subject = getValues("subject");

    if (subject) resetField("subject");
  }, [typeAppeal]);

  return (
    <form className={s.container} onSubmit={onSubmit}>
      <div className={s.input}>
        <Controller
          name="subject"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <Label label="Тип причины">
              <Select
                placeholder={"Выберите причину"}
                status={errors.subject && "error"}
                onSelect={(key) => field.onChange(key)}
                value={field.value}
                options={listTopics?.map((topic) => ({
                  label: topic.value,
                  value: topic.key,
                }))}
              />
            </Label>
          )}
        />
      </div>

      <div className={s.input}>
        <Controller
          name="files"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Label label="Прикрепите фото">
              <UploadFiles
                error={!!errors?.files}
                uploadsFilesChange={(file) => field.onChange(file)}
              />
            </Label>
          )}
        />
      </div>

      <div className={clsx(s.input)}>
        <Controller
          name="passengers"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <Label label="Список пассажиров">
              <div className={s.checkBox}>
                {listPassengers?.map((passenger) => (
                  <CheckBox
                    key={passenger.key}
                    checked={field.value?.includes(passenger.key)}
                    label={`${passenger?.name?.last || ""} ${
                      passenger?.name?.first || ""
                    } ${passenger?.name?.middle || ""}`}
                    onClick={() => {
                      if (field.value?.includes(passenger.key)) {
                        field.onChange(
                          field?.value?.filter((pas) => pas !== passenger.key),
                        );

                        return;
                      }

                      field.onChange([...field?.value, passenger?.key]);
                    }}
                  />
                ))}
              </div>

              {errors?.passengers ? (
                <p className={s.errorText}>Выберите пассажира</p>
              ) : null}
            </Label>
          )}
        />
      </div>

      <div className={s.input}>
        <Controller
          name="details"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <Label label="Коментарии">
              <Textarea
                status={errors.details && "error"}
                placeholder="Напишите комментарии"
                onChange={(e) => field.onChange(e.currentTarget?.value)}
              />
            </Label>
          )}
        />
      </div>

      <div className={s.buttons}>
        <Button paddingVariant="paddingSmall">Создать</Button>
      </div>
    </form>
  );
};
