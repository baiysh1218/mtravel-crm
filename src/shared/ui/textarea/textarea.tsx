import TextArea from "antd/es/input/TextArea";
import { TextAreaProps } from "antd/lib/input";
import { FC } from "react";

import s from "./styles.module.scss";

interface Props extends TextAreaProps {}

export const Textarea: FC<Props> = (props) => {
  return <TextArea {...props} className={s.textarea} />;
};
