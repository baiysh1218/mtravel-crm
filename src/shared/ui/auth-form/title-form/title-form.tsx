import { FC } from "react";

import { TYPE_FORM } from "@/shared/ui/auth-form/auth-form.tsx";

import styles from "./styles.module.scss";

interface Props {
  typeForm: TYPE_FORM;
  onChange?: (type: TYPE_FORM) => void;
}

export const TitleForm: FC<Props> = ({ typeForm, onChange }) => {
  return (
    <div className={styles.container}>
      {typeForm === TYPE_FORM.sighIn ? (
        <div className={styles.header}>
          <p className={styles.left}>Авторизация</p>

          <p
            className={styles.right}
            onClick={() => onChange?.(TYPE_FORM.sighUp)}
          >
            Забыли пароли?
          </p>
        </div>
      ) : (
        <div className={styles.header}>
          <p className={styles.left}>Забыли пароль?</p>

          <p
            className={styles.right}
            onClick={() => onChange?.(TYPE_FORM.sighIn)}
          >
            Назад
          </p>
        </div>
      )}

      {typeForm === TYPE_FORM.sighUp ? (
        <div className={styles.content}>
          <span>Пожалуйста, позвоните по номеру</span>
          <p>+996 000 000</p>
        </div>
      ) : null}
    </div>
  );
};
