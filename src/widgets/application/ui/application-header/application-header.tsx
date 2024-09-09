import { FC } from "react";
import { useParams } from "react-router-dom";

import {
  useAddInformationAppealMutation,
  useGetDetailAppealQuery,
} from "@/entities/application/api/api.ts";
import { AddInformationAppeal } from "@/entities/application/module";
import { SelectOperator } from "@/entities/managers/ui/select-operator";
import { ApplicationStatus } from "@/features/application/detail-application/application-status";
import {
  LIST_STATUS_APPLICATION,
  STATUS_NAMES_APPLICATION,
  TYPE_APPLICATION,
} from "@/shared/constants";
import { formatDate } from "@/shared/helper/formatDate.ts";
import { showNotification } from "@/shared/lib/showNotification";
import { showPopup } from "@/shared/lib/showPopup";
import { ButtonsAction } from "@/shared/ui/buttons-action";
import { Paper } from "@/shared/ui/paper";
import { DetailInfo } from "@/widgets/application/ui/application-header/ui/detail-info";

import styles from "./styles.module.scss";

interface Props {}

export const ApplicationHeader: FC<Props> = () => {
  const { id: appealID } = useParams();

  if (!appealID) return null;

  const {
    data: appealDetail,
    isFetching,
    refetch,
  } = useGetDetailAppealQuery(appealID);
  const [onSaveMessage, stateMessage] = useAddInformationAppealMutation();

  const onSaveAppeals = async (data: AddInformationAppeal) => {
    const preparedData = {
      billing_id: appealID,
      data,
    };

    onSaveMessage(preparedData);

    const popupData = await showPopup({
      content: "Вы уверены что хотите изменить",
      title: "Изменение",
    });

    if (!popupData) return;

    refetch()
      .unwrap()
      .then(() => {
        showNotification({ message: "Успешно изменено" });
      });
  };

  const onChangeManager = async (idManager: number) => {
    const preparedData = {
      billing_id: appealID,
      data: {
        crm_user_id: idManager,
      },
    };

    const popupData = await showPopup({
      content: "Вы уверены что хотите изменить",
      title: "Изменение",
    });

    if (!popupData) return;

    onSaveMessage(preparedData);
    refetch()
      .unwrap()
      .then(() => {
        showNotification({ message: "Успешно изменено" });
      });
  };

  const onChangeStatus = (key: string) => {
    onSaveAppeals({ status: key });
  };

  const formatedDate = formatDate(appealDetail?.created_at);

  const fullNameAppeal = `${appealDetail?.user?.last_name || ""} ${
    appealDetail?.user?.first_name || ""
  } ${appealDetail?.user?.middle_name || ""}`;
  return (
    <Paper isLoading={isFetching || stateMessage.isLoading}>
      <div className={styles.container}>
        <DetailInfo
          createdTime={formatedDate}
          fullName={fullNameAppeal}
          email={appealDetail?.email}
          phoneNumber={appealDetail?.user?.phone_number}
          typeAppeal={
            STATUS_NAMES_APPLICATION[appealDetail?.topic as TYPE_APPLICATION]
          }
          numberAppeal={String(
            appealDetail?.flight_appeal?.billing_number || "",
          )}
        />

        <div className={styles.wrapperMenu}>
          <ApplicationStatus
            value={appealDetail?.status}
            options={LIST_STATUS_APPLICATION}
            onChange={onChangeStatus}
          />

          {!isFetching && (
            <SelectOperator
              onChangeManager={onChangeManager}
              responsible={appealDetail?.responsible?.id}
            />
          )}

          <ButtonsAction mail={appealDetail?.email} />
        </div>
      </div>
    </Paper>
  );
};
