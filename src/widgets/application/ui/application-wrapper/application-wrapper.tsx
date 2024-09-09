import { FC } from "react";
import { useNavigate } from "react-router";
import { Outlet, useLocation } from "react-router-dom";

import { Tabs } from "@/shared/ui/tabs";
import { MenuItem } from "@/shared/ui/tabs/tabs.tsx";

import styles from "./styles.module.scss";

const ROUTER = {
  COMMON_DATA: "",
  TICKETS: "tickets",
  DETAIL: "detail",
};

export const ApplicationWrapper: FC = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const listRouter = pathname.split("/");

  const listItems: MenuItem[] = [
    {
      label: "Общие данные",
      key: ROUTER.COMMON_DATA,
    },
    {
      label: "Билеты",
      key: ROUTER.TICKETS,
    },
    {
      label: "Детали перелета",
      key: ROUTER.DETAIL,
    },
  ];

  const onClickTab = (data: MenuItem) => {
    navigate(String(data?.key), { replace: true });
  };

  return (
    <div className={styles.container}>
      <Tabs
        items={listItems}
        onClick={onClickTab}
        defaultValue={listRouter[3]}
      />

      <Outlet />
    </div>
  );
};
