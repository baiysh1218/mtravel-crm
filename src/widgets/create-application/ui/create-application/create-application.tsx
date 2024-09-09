import debounce from "debounce";
import { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useOnCreateReturnRefundAppealMutation } from "@/entities/application/api/api.ts";
import {
  CreateAppeal,
  CreateAppealFormData,
  FormCreateAdditionalService,
  FormCreateAppeal,
} from "@/entities/application/module/create-appeal.ts";
import { ApplicationCommonCreate } from "@/entities/application/ui/application-common-create";
import { ApplicationCreateService } from "@/entities/application/ui/application-create-service";
import { useSearchTicketsMutation } from "@/entities/ticket/api";
import { TYPE_APPLICATION } from "@/shared/constants";
import { showNotification } from "@/shared/lib/showNotification.ts";
import { Label } from "@/shared/ui/label";
import { Paper } from "@/shared/ui/paper";
import { Select } from "@/shared/ui/select";
import { prepareFormData } from "@/widgets/create-application/lib";

import s from "./styles.module.scss";

export interface Form extends Omit<CreateAppeal, "billing_number"> {}

enum TYPE_APPLICATION_CREATE {
  "REFUND" = TYPE_APPLICATION.REFUND,
  "EXCHANGE" = TYPE_APPLICATION.EXCHANGE,
  "ADDITIONAL_SERVICE" = TYPE_APPLICATION.ADDITIONAL_SERVICE,
  "OTHER" = TYPE_APPLICATION.OTHER,
}

const listTypeApplications = [
  {
    value: TYPE_APPLICATION_CREATE.REFUND,
    label: "Возврат",
  },
  {
    value: TYPE_APPLICATION_CREATE.EXCHANGE,
    label: "Обмен",
  },
  {
    value: TYPE_APPLICATION_CREATE.ADDITIONAL_SERVICE,
    label: "Заказ доп. услуги",
  },
  {
    value: TYPE_APPLICATION_CREATE.OTHER,
    label: "Другое",
  },
];

const applicationCommonMap = {
  [TYPE_APPLICATION_CREATE.EXCHANGE]: TYPE_APPLICATION_CREATE.EXCHANGE,
  [TYPE_APPLICATION_CREATE.REFUND]: TYPE_APPLICATION_CREATE.REFUND,
  [TYPE_APPLICATION_CREATE.OTHER]: TYPE_APPLICATION_CREATE.OTHER,
};

interface Props {}

export const CreateApplication: FC<Props> = () => {
  const [param, setParams] = useSearchParams();

  const searchedBilling = param.get("searched");

  const [searchTicket, results] = useSearchTicketsMutation();

  const [onCreate, appealState] = useOnCreateReturnRefundAppealMutation();

  const [typeApplication, setTypeApplication] =
    useState<TYPE_APPLICATION_CREATE>();

  const onSearchTicket = (value: string) => {
    if (!value) return;

    searchTicket(value);
  };

  const onSelectHandler = (billingNumber: string) => {
    if (!billingNumber) return;

    setParams(
      (params) => {
        params.set("searched", billingNumber);

        return params;
      },
      { replace: true },
    );
  };

  const onSelectTypeApplication = (
    typeApplication: TYPE_APPLICATION_CREATE,
  ) => {
    setTypeApplication(typeApplication);
  };

  const onCreateApplication = (data: FormCreateAppeal) => {
    const listData: CreateAppealFormData = {
      billing_number: Number(searchedBilling),
      topic: typeApplication!,
      subject: data?.subject,
      details: data?.details,
      images: data.files,
      appeals_detail: {
        passengers: data?.passengers?.map((item) => ({ passenger_key: item })),
      },
    };

    const formData = prepareFormData(listData);

    onCreate(formData)
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
  };

  const onCreateAdditionalService = (data: FormCreateAdditionalService[]) => {
    const resultData: CreateAppealFormData[] | undefined = data?.map(
      (item) => ({
        billing_number: Number(searchedBilling),
        topic: typeApplication!,
        subject: item.topic,
        details: item.details,
        images: item.files,
        appeals_detail: {
          passengers: item?.passengers?.map((item) => ({
            passenger_key: item,
          })),
        },
      }),
    );

    onCreateAdditionalServiceRequest(resultData);
  };

  const onCreateAdditionalServiceRequest = (
    dataList?: CreateAppealFormData[],
    index: number = 0,
  ) => {
    if (!dataList) return;

    if (dataList && !dataList[index]) {
      showNotification({ message: `Вы успешно создали заявку` });

      return;
    }

    const formData = prepareFormData(dataList[index]);

    onCreate(formData)
      .unwrap()
      .then(() => {
        onCreateAdditionalServiceRequest(dataList, index + 1);
      })
      .catch((error) => {
        showNotification({
          message: `Ошибка: ${JSON.stringify(error)}`,
          type: "error",
        });
      });
  };

  return (
    <Paper isLoading={appealState.isLoading}>
      <div className={s.container}>
        <p className={s.title}>Создание заявки</p>

        <div className={s.input}>
          <Label label="Номер заказа">
            <Select
              placeholder={"Номер"}
              defaultValue={searchedBilling}
              showSearch
              onSelect={onSelectHandler}
              loading={results?.isLoading}
              autoClearSearchValue={false}
              onSearch={debounce(onSearchTicket, 1000)}
              options={results?.data?.map((number) => ({
                value: number,
                label: number,
              }))}
            />
          </Label>
        </div>

        {searchedBilling ? (
          <div className={s.wrapper} key={searchedBilling}>
            <div className={s.input}>
              <Label label="Тип заявки">
                <Select
                  value={typeApplication}
                  options={listTypeApplications}
                  onSelect={onSelectTypeApplication}
                  placeholder={"Выберите тип заявки"}
                />
              </Label>
            </div>
            {applicationCommonMap[
              typeApplication as keyof typeof applicationCommonMap
            ] && (
              <ApplicationCommonCreate
                typeAppeal={typeApplication || ""}
                onCreate={onCreateApplication}
              />
            )}
            {typeApplication === TYPE_APPLICATION_CREATE.ADDITIONAL_SERVICE ? (
              <ApplicationCreateService onCreate={onCreateAdditionalService} />
            ) : null}
          </div>
        ) : null}
      </div>
    </Paper>
  );
};
