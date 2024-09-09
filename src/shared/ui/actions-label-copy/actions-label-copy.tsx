import { FC } from "react";

import { useCopyText } from "@/shared/helper/useCopyText.ts";
import { AppIcon } from "@/shared/icons/app-icon";
import { AllIcons } from "@/shared/icons/app-icon/types.ts";
import { showNotification } from "@/shared/lib/showNotification";
import { LabelText } from "@/shared/ui/label-text";

import s from "./styles.module.scss";

interface Props {
  label?: string;
  value?: string;
  copyText?: string;
}

export const ActionsLabelCopy: FC<Props> = (props) => {
  const onClickCopy = () => {
    useCopyText(String(props.value));
    showNotification({ message: props?.copyText || "Текст скопирован" });
  };

  return (
    <div className={s.container}>
      <LabelText {...props} />

      <button className={s.rightAction} onClick={onClickCopy}>
        <AppIcon id={AllIcons.COPY} className={s.icon} />
      </button>
    </div>
  );
};
