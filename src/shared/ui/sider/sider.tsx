import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { MenuProps } from "antd/lib";
import clsx from "clsx";
import { FC, ReactNode, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

import ArrowImage from "@/assets/icons/arrow_left.svg";
import LogoIcon from "@/assets/icons/mtravel_short_logo.svg";
import { LIST_SIDER_NAVIGATION, ROUTER_NAVIGATION } from "@/shared/constants";
import { useAppSelector } from "@/shared/lib/hooks.ts";

import styles from "./styles.module.scss";

interface Props {
  children: ReactNode;
}

const fullWidth = 200;
const minWidth = 60;

export const SiderApplication: FC<Props> = ({ children }) => {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState<boolean>(true);

  const { user } = useAppSelector((state) => state.userStore);

  const pathname = location?.pathname;

  const navigate = useNavigate();

  const selectHandler: MenuProps["onClick"] = (item) => {
    navigate(item.key);
  };
  const onClickHome = () => {
    navigate(ROUTER_NAVIGATION.MAIN);
  };

  if (!user) return null;

  const listSiderIcons = LIST_SIDER_NAVIGATION[user?.role]?.map(
    (siderItem) => ({
      ...siderItem,
      icon: (
        <span
          className={clsx(styles.unSelect, {
            [styles.active]: pathname === siderItem.key,
          })}
        >
          {siderItem.icon}
        </span>
      ),
    }),
  );

  return (
    <div>
      <Sider
        breakpoint={"sm"}
        collapsible
        theme="light"
        width={fullWidth}
        collapsedWidth={minWidth}
        collapsed={collapsed}
        className={styles.wrapper}
        trigger={
          <div
            className={clsx(styles.trigger, collapsed && styles.collapsed)}
            onClick={() => setCollapsed(!collapsed)}
          >
            <div className={styles.icon}>
              <img src={ArrowImage} alt="" />
            </div>

            <span className={styles.hideText}>Свернуть меню</span>
          </div>
        }
      >
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
          <div className={styles.logoWrapper} onClick={onClickHome}>
            <img
              loading="lazy"
              src={LogoIcon}
              width={25}
              height={25}
              className={styles.image}
              alt="logo"
            />
          </div>

          <div className={styles.navWrapper}>
            <Menu
              mode="inline"
              items={listSiderIcons?.map((item) => {
                return { ...item, icon: item.icon };
              })}
              className={clsx(
                styles.menuWrapper,
                collapsed && styles.collapsed,
              )}
              onClick={selectHandler}
              defaultSelectedKeys={["1"]}
            />
          </div>
        </div>
      </Sider>

      <div className={styles.page}>{children}</div>
    </div>
  );
};
