import { clsx } from "clsx";
import { FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import LogoIcon from "@/assets/icons/mtravel_icon.svg";
import { useAuthUserMutation } from "@/entities/profile/api/api.ts";
import { loginUser } from "@/entities/profile/model/slice.ts";
import { AuthorizeUser, SaveToken } from "@/entities/profile/model/types.ts";
import { ROUTER_NAVIGATION } from "@/shared/constants";
import { showNotification } from "@/shared/lib/showNotification";
import { Button } from "@/shared/ui/button";
import { CheckBox } from "@/shared/ui/check-box";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { PassportInput } from "@/shared/ui/passport-input";

import styles from "./styles.module.scss";
import { TitleForm } from "./title-form";

export enum TYPE_FORM {
  sighIn = "signIn",
  sighUp = "signUp",
}

interface SignIn {
  username?: string;
  password?: string;
  rememberMe?: boolean;
}

export const AuthForm: FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [auth, authState] = useAuthUserMutation();

  const [page, setPage] = useState<TYPE_FORM>(TYPE_FORM.sighIn);
  const [form, setForm] = useState<SignIn>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: AuthorizeUser = {
      username: form?.username || "",
      password: form?.password || "",
    };

    auth(data)
      .unwrap()
      .then(({ access, refresh }) => {
        const data: SaveToken = {
          access: access,
          refresh: refresh,
          rememberMe: form?.rememberMe,
        };

        dispatch(loginUser(data));
        navigate(ROUTER_NAVIGATION.MAIN);
      })
      .catch((error) => {
        showNotification({
          message: `Ошибка: ${JSON.stringify(error)}`,
          type: "error",
        });
      });
  };

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setForm((data) => ({ ...data, [name]: value || "" }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <img src={LogoIcon} alt="" />
        </div>

        <TitleForm typeForm={page} onChange={(value) => setPage(value)} />
      </div>

      {page === TYPE_FORM.sighIn ? (
        <form onSubmit={onSubmit}>
          <div className={styles.item}>
            <Label label="Логин">
              <Input
                placeholder="Вводите логин"
                error={authState.isError}
                onChange={onInput}
                name={"username"}
              />
            </Label>
          </div>

          <div className={styles.item}>
            <PassportInput
              placeholder="Введите пароль"
              error={authState.isError}
              onChange={onInput}
              name={"password"}
              label="Пароль"
            />
          </div>

          <div className={clsx(styles.item, styles.itemFooter)}>
            <CheckBox
              label="Запомнить меня"
              checked={Boolean(form?.rememberMe)}
              onClick={() =>
                setForm((data) => ({
                  ...data,
                  rememberMe: !Boolean(form?.rememberMe),
                }))
              }
            />

            <div className={styles.button}>
              <Button>Войти</Button>
            </div>
          </div>
        </form>
      ) : null}
    </div>
  );
};
