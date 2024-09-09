import TextArea from "antd/es/input/TextArea";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";

import { useAddInformationAppealMutation } from "@/entities/application/api/api.ts";
import { showNotification } from "@/shared/lib/showNotification";
import { showPopup } from "@/shared/lib/showPopup";
import { Button } from "@/shared/ui/button";
import { Paper } from "@/shared/ui/paper";

import s from "./styles.module.scss";

interface Props {
  commentary?: string;
}

export const ApplicationComment: FC<Props> = ({ commentary }) => {
  const { id: appealID } = useParams();

  if (!appealID) return null;

  const [onSaveMessage, stateMessage] = useAddInformationAppealMutation();

  const [comment, setComment] = useState<string>(commentary || "");

  const onSaveComment = async () => {
    const data = {
      billing_id: appealID,
      data: {
        commentary: comment,
      },
    };

    const dataPopUp = await showPopup({
      status: "info",
      title: "Комментарии",
      content: "Уверены что хотите добавить комментарии",
      okText: "Да",
      cancelText: "Отмена",
    });

    if (!dataPopUp) return;

    onSaveMessage(data)
      .unwrap()
      .then(() => {
        showNotification({ message: "Комментарий успешно добавлен" });
      })
      .catch((error) => {
        showNotification({
          message: `При добовлении коментария произошла ошибка ${JSON.stringify(
            error,
          )}`,
          type: "error",
        });
      });
  };

  return (
    <Paper isLoading={stateMessage.isLoading}>
      <div className={s.container}>
        <p className={s.title}>Комментарий</p>

        <TextArea
          defaultValue={comment}
          className={s.textarea}
          onChange={(e) => setComment(e.currentTarget.value)}
        />

        <div className={s.button}>
          <Button
            type="secondary"
            onClick={onSaveComment}
            disabled={stateMessage.isLoading}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </Paper>
  );
};
