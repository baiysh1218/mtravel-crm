import { clsx } from "clsx";
import { FC } from "react";

import { ActionsLabelCopy } from "@/shared/ui/actions-label-copy";
import { LabelText } from "@/shared/ui/label-text";

import styles from "./styles.module.scss";

interface Props {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  typeAppeal?: string;
  numberAppeal?: string;
  createdTime?: string;
}

export const DetailInfo: FC<Props> = (props) => {
  const {
    fullName,
    phoneNumber,
    email,
    typeAppeal,
    numberAppeal,
    createdTime,
  } = props;

  return (
    <div className={styles.container}>
      <div className={clsx(styles.list, styles.marginBottom)}>
        {fullName ? (
          <div className={styles.item}>
            <LabelText label="Ф.И.О. покупателя" value={fullName} />
          </div>
        ) : null}

        {phoneNumber ? (
          <div className={styles.item}>
            <ActionsLabelCopy
              label="Номер телефона"
              value={phoneNumber}
              copyText={"Вы скопировали номер телефона"}
            />
          </div>
        ) : null}

        {email ? (
          <div className={styles.item}>
            <ActionsLabelCopy
              label="E-mail"
              value={email}
              copyText={"Вы скопировали номер почту"}
            />
          </div>
        ) : null}
      </div>

      <div className={clsx(styles.listSecond, styles.marginBottom)}>
        {typeAppeal || numberAppeal ? (
          <div className={clsx(styles.list, styles.border)}>
            {typeAppeal ? (
              <div className={styles.item}>
                <LabelText label="Тема обращения" value={typeAppeal} />
              </div>
            ) : null}

            {numberAppeal ? (
              <div className={styles.item}>
                <ActionsLabelCopy
                  label="Номер заказа"
                  value={numberAppeal}
                  copyText={"Вы скопировали номер заказа"}
                />
              </div>
            ) : null}
          </div>
        ) : null}

        {createdTime ? (
          <div className={clsx(styles.itemBlock, styles.border)}>
            <LabelText label="Дата и время заявки" value={createdTime} />
          </div>
        ) : null}
      </div>
    </div>
  );
};
