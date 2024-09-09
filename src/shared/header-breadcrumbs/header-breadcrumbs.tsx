import { FC } from "react";
import { useNavigate } from "react-router";

import { UserProfile } from "@/entities/profile/ui/user-profile";
import { BackButton } from "@/shared/ui/back-button";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs";
import { ItemBreadCrumbs } from "@/shared/ui/breadcrumbs/breadcrumbs.tsx";

import styles from "./styles.module.scss";

interface Props {
  listBread: ItemBreadCrumbs[];
}

export const HeaderBreadcrumbs: FC<Props> = ({ listBread }) => {
  const navigate = useNavigate();

  const onClickBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.back}>
          <BackButton onClick={onClickBack} />
        </div>

        <Breadcrumbs listProps={listBread} />
      </div>

      <div className={styles.right}>
        <UserProfile />
      </div>
    </div>
  );
};
