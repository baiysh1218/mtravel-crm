import { FC } from "react";

import { HeaderBreadcrumbs } from "@/shared/header-breadcrumbs";
import { ItemBreadCrumbs } from "@/shared/ui/breadcrumbs/breadcrumbs.tsx";
import { ApplicationHeader } from "@/widgets/application/ui/application-header";
import { ApplicationWrapper } from "@/widgets/application/ui/application-wrapper";

import styles from "./styles.module.scss";

const listBread: ItemBreadCrumbs[] = [
  {
    name: "Главная",
    link: "/",
  },
  {
    name: "Заявка",
  },
];

export const DetailApplication: FC = () => {
  return (
    <>
      <div className={styles.bread}>
        <HeaderBreadcrumbs listBread={listBread} />
      </div>

      <ApplicationHeader />

      <ApplicationWrapper />
    </>
  );
};
