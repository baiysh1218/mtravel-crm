import { Select as AntSelect, SelectProps } from "antd";
import { FC } from "react";

interface Props extends SelectProps {}

export const Select: FC<Props> = (props) => {
  return <AntSelect style={{ width: "100%" }} {...props} />;
};
