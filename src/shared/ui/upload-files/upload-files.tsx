import { clsx } from "clsx";
import { ChangeEvent, FC, useState } from "react";
import { FieldError } from "react-hook-form";

import { useGetCssColor } from "@/shared/helper/useGetCssColor.ts";
import { AppIcon } from "@/shared/icons/app-icon";
import { AllIcons } from "@/shared/icons/app-icon/types.ts";

import s from "./styles.module.scss";

interface Props {
  value?: File[];
  uploadsFilesChange?: (data: File[] | undefined) => void;
  error?: FieldError | boolean;
}

export const UploadFiles: FC<Props> = ({
  uploadsFilesChange,
  value,
  error,
}) => {
  const [uploadsFiles, setUploadFiles] = useState<File[] | null>(value || null);

  const onLoadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const uploadedFiles = uploadsFiles?.length
      ? [...uploadsFiles, file]
      : [file];

    if (uploadsFiles !== null) {
      setUploadFiles((data) => [...data!, file]);
    } else {
      setUploadFiles([file]);
    }

    uploadsFilesChange?.(uploadedFiles);
  };

  const onRemoveImage = (index: number) => {
    const newFiles = uploadsFiles?.filter((_, ind) => ind !== index);

    setUploadFiles(newFiles || null);
    uploadsFilesChange?.(newFiles);
  };

  const filesUrls =
    uploadsFiles?.map((item) => URL.createObjectURL(item)) || [];

  const color = useGetCssColor("--white");
  return (
    <div className={s.container}>
      {(uploadsFiles?.length || 0) < 3 ? (
        <label className={clsx(s.label, error && s.error)}>
          <AppIcon id={AllIcons.LOAD} width={16} height={16} />
          Загрузить файл
          <input
            type="file"
            onChange={onLoadFile}
            className={s.input}
            accept="image/*"
          />
        </label>
      ) : null}

      <div className={s.wrapperList}>
        {filesUrls?.map((item, index) => (
          <div className={s.item} key={"file" + index}>
            <img src={item} alt="" />

            <span className={s.iconClose} onClick={() => onRemoveImage(index)}>
              <AppIcon id={AllIcons.CROSS} style={{ color }} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
