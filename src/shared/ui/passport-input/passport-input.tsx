import { FC, useState } from "react";

import EyeClose from "@/assets/icons/eye_close.svg";
import EyeOpen from "@/assets/icons/eye_open.svg";
import { Input } from "@/shared/ui/input";
import { Props as InputProps } from "@/shared/ui/input/input.tsx";
import { Label } from "@/shared/ui/label";

import styles from "./styles.module.scss";

interface Props extends InputProps {
  placeholder?: string;
  label?: string;
}

const RenderIcon = ({ show }: { show: boolean }) => {
  return (
    <img src={`${show ? EyeClose : EyeOpen}`} className={styles.icon} alt="" />
  );
};

export const PassportInput: FC<Props> = ({ placeholder, label, ...props }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onClickIcon = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Label label={label}>
      <Input
        {...props}
        placeholder={placeholder}
        rightOnClick={onClickIcon}
        type={showPassword ? "text" : "password"}
        rightIcon={<RenderIcon show={showPassword} />}
      />
    </Label>
  );
};
