import { FC } from "react";

import magnifierIcon from "@/assets/icons/magnifier-icon.svg";
import { Input } from "@/shared/ui/input";
import { Props as InputProps } from "@/shared/ui/input/input.tsx";

export const SearchInput: FC<InputProps> = (props) => {
  return (
    <Input
      {...props}
      height="sm"
      placeholder={"Поиск"}
      rightIcon={<img src={magnifierIcon} alt="" />}
    />
  );
};
