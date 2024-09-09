import { FC } from "react";

import { AuthForm } from "@/shared/ui/auth-form";

import styles from "./styles.module.scss";

export const AuthPage: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <AuthForm />
      </div>
    </div>
  );
};
