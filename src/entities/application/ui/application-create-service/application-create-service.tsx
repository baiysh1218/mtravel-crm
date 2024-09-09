import { FC } from "react";
import {
  Control,
  Controller,
  FieldArrayWithId,
  FieldErrors,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useSearchParams } from "react-router-dom";

import { useGetAppealSubjectsQuery } from "@/entities/application/api/api.ts";
import { FormCreateAdditionalService } from "@/entities/application/module/create-appeal.ts";
import { useGetDetailInfoByNumberQuery } from "@/entities/ticket/api";
import { AppIcon } from "@/shared/icons/app-icon";
import { AllIcons } from "@/shared/icons/app-icon/types.ts";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import { MultiSelect } from "@/shared/ui/multi-select";
import { Select } from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";
import { UploadFiles } from "@/shared/ui/upload-files";

import s from "./styles.module.scss";

interface Props {
  onCreate?: (data: FormCreateAdditionalService[]) => void;
}

interface Option {
  label: string;
  value: string;
}

interface ServiceProps {
  id?: string;
  index: number;
  listPassengers?: Option[];
  listService?: Option[];
  control: Control<FormAdditionalService>;
  errors: FieldErrors<FormAdditionalService>;
  passenger: FieldArrayWithId<FormAdditionalService>;
  onDelete?: () => void;
}

interface FormAdditionalService {
  forms: FormCreateAdditionalService[];
}

const ServiceBlock: FC<ServiceProps> = (props) => {
  const {
    id,
    listPassengers,
    listService,
    index,
    control,
    passenger,
    errors,
    onDelete,
  } = props;

  return (
    <Label label={`Услуга №${index + 1}`} key={id}>
      <div className={s.passengerBlock}>
        {index >= 1 ? (
          <span className={s.deleteButton} onClick={onDelete}>
            Удалить
          </span>
        ) : null}

        <div className={s.input}>
          <Label label="Выберите услугу">
            <Controller
              key={id}
              control={control}
              rules={{ required: true }}
              name={`forms.${index}.topic`}
              defaultValue={passenger.topic}
              render={({ field }) => (
                <Select
                  value={field.value}
                  options={listService}
                  placeholder={"Услуга"}
                  onChange={(value) => field?.onChange(value)}
                  status={errors?.forms?.[index]?.topic && "error"}
                />
              )}
            />
          </Label>
        </div>

        <div className={s.input}>
          <Label label="Выберите пассажиров">
            <Controller
              key={id}
              control={control}
              rules={{ required: true }}
              name={`forms.${index}.passengers`}
              defaultValue={passenger.passengers}
              render={({ field }) => (
                <MultiSelect
                  value={field.value}
                  placeholder={"Пассажиры"}
                  options={listPassengers}
                  onChange={(value) => {
                    field?.onChange(value?.map((item) => item.value));
                  }}
                  status={errors?.forms?.[index]?.passengers && "error"}
                />
              )}
            />
          </Label>
        </div>

        <div className={s.input}>
          <Label label="Прикрепите фото">
            <Controller
              key={id}
              control={control}
              rules={{ required: true }}
              name={`forms.${index}.files`}
              defaultValue={passenger.files}
              render={({ field }) => (
                <UploadFiles
                  value={field.value}
                  key={`forms.${index}.files`}
                  error={!!errors?.forms?.[index]?.files}
                  uploadsFilesChange={(file) => field.onChange(file)}
                />
              )}
            />
          </Label>
        </div>

        <div className={s.input}>
          <Controller
            key={id}
            control={control}
            rules={{ required: true }}
            name={`forms.${index}.details`}
            defaultValue={passenger.details}
            render={({ field }) => (
              <Label label="Коментарии">
                <Textarea
                  value={field.value}
                  status={errors?.forms?.[index]?.details && "error"}
                  placeholder="Напишите комментарии"
                  onChange={(e) => field.onChange(e.currentTarget?.value)}
                />
              </Label>
            )}
          />
        </div>
      </div>
    </Label>
  );
};

export const ApplicationCreateService: FC<Props> = ({ onCreate }) => {
  const [param] = useSearchParams();

  const searchedBilling = param.get("searched");

  if (!searchedBilling) return null;

  const { data } = useGetDetailInfoByNumberQuery(searchedBilling);
  const { data: dataSubjects } = useGetAppealSubjectsQuery();

  const listTopics = dataSubjects?.[0]?.additional_service_subjects;

  const listOfPassengers = data?.flight_details?.tickets?.[0]?.passengers;

  const listPassengers = listOfPassengers?.map((passenger) => ({
    label: `${passenger?.name?.last || ""} ${passenger?.name?.first || ""} ${passenger?.name?.middle || ""}`,
    value: passenger?.key,
  }));

  const listAdditionalService = listTopics?.map((topic) => ({
    label: topic.value,
    value: topic.key,
  }));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormAdditionalService>({ defaultValues: { forms: [{}] } });

  const onSubmit = handleSubmit((data) => {
    onCreate?.(data?.forms);
  });

  const {
    fields: listFormsData,
    append,
    remove,
  } = useFieldArray({ control, name: "forms" });

  const addServices = () => append({});

  const deleteService = (idPassenger?: number) => remove(idPassenger);

  return (
    <div className={s.container}>
      {listFormsData?.map((itemPassenger, index) => {
        return (
          <div className={s.service} key={"ser" + index}>
            <ServiceBlock
              id={itemPassenger.id}
              index={index}
              errors={errors}
              control={control}
              passenger={itemPassenger}
              listPassengers={listPassengers}
              listService={listAdditionalService}
              onDelete={() => deleteService(index)}
            />
          </div>
        );
      })}

      <div className={s.buttonAddPassenger}>
        <Button
          type="third"
          paddingVariant="paddingSmall"
          onClick={addServices}
        >
          <div className={s.buttonContent}>
            <AppIcon
              width={16}
              height={16}
              className={s.icon}
              id={AllIcons.PLUS_SIMPLE}
            />
            Добавить услугу
          </div>
        </Button>
      </div>

      <div className={s.buttons}>
        <Button paddingVariant="paddingSmall" onClick={onSubmit}>
          Создать
        </Button>
      </div>
    </div>
  );
};
