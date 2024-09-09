import { FC } from "react";
import { useNavigate } from "react-router";

import { UserProfile } from "@/entities/profile/ui/user-profile";
import { StatusesRequestButtons } from "@/features/application/list-application/status-application";
import { MainTabs } from "@/features/application/list-application/type-application-tabs";
import { Filter } from "@/features/filter-list/ui/filter";
import { ROUTER_NAVIGATION } from "@/shared/constants";
import { AppIcon } from "@/shared/icons/app-icon";
import { AllIcons } from "@/shared/icons/app-icon/types.ts";
import { Button } from "@/shared/ui/button";
import { Paper } from "@/shared/ui/paper";
import { MainTable } from "@/widgets/application/ui/main-table";

import s from "./styles.module.scss";

export const MainPage: FC = () => {
  const navigate = useNavigate();

  const onClickCreateApplication = () => {
    navigate(ROUTER_NAVIGATION.CREATE_APPLICATION);
  };

  return (
    <>
      <Paper>
        <div className={s.header}>
          <h1>Заявки</h1>

          <UserProfile isGrey />
        </div>

        <div className={s.filter}>
          <Filter />
        </div>

        <div className={s.tabs}>
          <MainTabs />
        </div>
      </Paper>

      <div className={s.content}>
        <div className={s.header}>
          <StatusesRequestButtons />

          <div className={s.button}>
            <Button
              style={{ fontSize: 14 }}
              paddingVariant="paddingSmall"
              onClick={onClickCreateApplication}
            >
              <div className={s.contentButton}>
                <AppIcon id={AllIcons.PLUS} height={16} width={16} />
                Создать заявку
              </div>
            </Button>
          </div>
        </div>

        <MainTable />
      </div>
    </>
  );
};
