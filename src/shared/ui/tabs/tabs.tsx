import { Menu } from "antd";
import type { MenuProps } from "antd";
import { FC, useState } from "react";

import styles from "./styles.module.scss";

export type MenuItem = Required<MenuProps>["items"][number];

interface Props extends MenuProps {
  items: MenuItem[];
  onClick?: MenuProps["onClick"];
}

export const Tabs: FC<Props> = (props) => {
  const { items, onClick, defaultValue } = props;

  const [current, setCurrent] = useState(
    String(defaultValue || items?.[0]?.key),
  );

  const onClickHandler: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    onClick?.(e);
  };

  return (
    <div className={styles.container}>
      <Menu
        items={items}
        mode="horizontal"
        onClick={onClickHandler}
        selectedKeys={[current]}
        className={styles.container}
      />
    </div>
  );
};
