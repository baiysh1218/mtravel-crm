import { Dropdown } from "antd";
import { MenuProps } from "antd/lib";
import { clsx } from "clsx";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { logOut } from "@/entities/profile/model/slice.ts";
import { ACCESS_USER, ROUTER_NAVIGATION } from "@/shared/constants";
import { LogoutIcon } from "@/shared/icons/logout-icon";
import { UserIcon } from "@/shared/icons/user-icon";
import { useAppSelector } from "@/shared/lib/hooks.ts";

import styles from "./styles.module.scss";

enum MenuTypes {
  logout = "logout",
}

const items: MenuProps["items"] = [
  {
    label: "Выйти",
    key: MenuTypes.logout,
    className: styles.textLogOut,
    icon: <LogoutIcon className={styles.iconLogOut} />,
  },
];

interface Props {
  isGrey?: boolean;
}

export const UserProfile: FC<Props> = ({ isGrey }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.userStore);

  const isAdmin = user?.role === ACCESS_USER.ADMIN;

  const dropdownHandler: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case MenuTypes.logout:
        dispatch(logOut());
        navigate(ROUTER_NAVIGATION.AUTH);
    }
  };

  const fullName = isAdmin ? "Admin" : `${user?.last_name} ${user?.first_name}`;

  return (
    <div className={styles.container}>
      <div className={clsx(isGrey && styles.bgGrey, styles.user)}>
        <UserIcon />
      </div>

      <Dropdown menu={{ items, onClick: dropdownHandler }} trigger={["click"]}>
        <span className={styles.userName}>{fullName}</span>
      </Dropdown>
    </div>
  );
};
