import TextArea from "antd/es/input/TextArea";
import { clsx } from "clsx";
import { FC, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import {
  useGetDetailAppealQuery,
  useGetMessagesAppealQuery,
  useOnSendMessageMutation,
} from "@/entities/application/api";
import { formatDate } from "@/shared/helper/formatDate.ts";
import { AppIcon } from "@/shared/icons/app-icon";
import { AllIcons } from "@/shared/icons/app-icon/types.ts";
import { Button } from "@/shared/ui/button";
import { Loader } from "@/shared/ui/loader";

import s from "./styles.module.scss";

interface Props {}

interface PropsChatItem {
  isMy?: boolean;
  subject?: string;
  message?: string;
  time?: string;
}

const ItemChat: FC<PropsChatItem> = (props) => {
  const { message, isMy, time, subject } = props;

  return (
    <div className={clsx(s.wrapper, isMy && s.interlocutorWrapper)}>
      <div className={clsx(s.contentItem, isMy ? s.myItem : s.interlocutor)}>
        <p className={s.subject}>{subject}</p>

        <span>{message}</span>
      </div>

      <span className={s.time}>{time}</span>
    </div>
  );
};

export const ChatCreateRequest: FC<Props> = () => {
  const { id: appealID } = useParams();

  if (!appealID) return null;

  const { data: appealDetail, isFetching } = useGetDetailAppealQuery(appealID);

  const { data: appealMessages, refetch } = useGetMessagesAppealQuery({
    billing_id: String(appealDetail?.flight_appeal?.id),
  });

  const [onSendMassage, messageStatus] = useOnSendMessageMutation();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const chatRef = useRef<HTMLDivElement>(null);

  const onChowChat = () => {
    setIsOpen(true);
    chatRef?.current?.scroll({ top: chatRef?.current?.scrollHeight });
  };

  const onSendMessage = () => {
    if (message.trim()) {
      onSendMassage({
        body: message.trim(),
        subject: appealDetail?.flight_appeal?.topic || "",
        ticket_id: appealDetail?.flight_appeal?.avia_appeal_id || "",
      })
        .unwrap()
        .then(() => {
          refetch();
          setMessage("");
        });
    }
  };

  const onInputMessage = (event: any) => {
    const result =
      event?.altKey || event?.ctrlKey || event?.metaKey || event?.shiftKey;

    if (!result && event?.code === "Enter") {
      onSendMessage();
    }
  };

  return (
    <>
      <section className={clsx(s.container, isOpen && s.chatWrapperOpen)}>
        <section className={s.header}>
          <p>Создание обращение в КЦ</p>

          <AppIcon
            width={32}
            height={32}
            className={s.arrow}
            id={AllIcons.ARROW_LEFT}
            onClick={() => setIsOpen(false)}
          />
        </section>

        <section className={s.body} ref={chatRef}>
          <div className={s.content}>
            {appealMessages?.map((item) => (
              <ItemChat
                subject={item?.subject}
                message={item?.body}
                isMy={!item?.is_outgoing}
                time={formatDate(item.created_at)}
              />
            ))}
          </div>
        </section>

        <div className={s.footer}>
          <TextArea
            value={message}
            className={s.textarea}
            placeholder={"Напишите сообщение"}
            onKeyDown={onInputMessage}
            onChange={(e) => setMessage(e.currentTarget.value)}
          />

          <div className={s.button}>
            <Button onClick={onSendMessage} disabled={messageStatus.isLoading}>
              Отправить
            </Button>
          </div>

          {(messageStatus.isLoading || isFetching) && (
            <div className={s.loader}>
              <Loader />
            </div>
          )}
        </div>
      </section>

      {!isOpen ? (
        <button className={s.buttonChat} onClick={onChowChat}>
          <AppIcon id={AllIcons.ARROW_LEFT} className={s.arrowChat} />

          <span className={s.content}>
            <AppIcon id={AllIcons.CHAR} className={s.chatIcon} />
            Обращение в КЦ
          </span>
        </button>
      ) : null}
    </>
  );
};
