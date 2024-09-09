import { FC } from "react";

import s from "./styles.module.scss";

export interface Props {
  title?: string;
  text?: string;
}

export const TitleText: FC<Props> = ({ title, text }) => {
  return (
    <div className={s.container}>
      <span>{title}</span>
      <p>{text}</p>
    </div>
  );
};
