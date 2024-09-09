import clsx from "clsx";
import { FC } from "react";

import { AppIcon } from "@/shared/icons/app-icon";
import { AllIcons } from "@/shared/icons/app-icon/types.ts";

import styles from "./styles.module.scss";

export const IconsPage: FC = () => {
  const copyIconText = ({ text }: { text: string }) => {
    navigator.clipboard.writeText(text).then(() => {
      return null;
    });
  };

  const ArrayOfIcons = Object.values(AllIcons);

  return (
    <section className={clsx(styles.wrapper, "box")}>
      <h1 className={styles.title}>Все иконки</h1>

      <div className={styles.grid}>
        {ArrayOfIcons.map((item) => (
          <div
            className={styles.item}
            onClick={() => {
              copyIconText({ text: item });
            }}
            key={item}
          >
            <AppIcon
              className={styles.iconClass}
              height={40}
              width={40}
              id={item}
            />
            <div className={styles.name}>{item}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
