import { FC } from "react";
import { useNavigate } from "react-router";

import styles from "./styles.module.scss";

export interface ItemBreadCrumbs {
  name: string;
  link?: string;
}

interface Props {
  listProps: ItemBreadCrumbs[];
}

export const Breadcrumbs: FC<Props> = ({ listProps }) => {
  const navigate = useNavigate();

  const onClickHandler = (bread: ItemBreadCrumbs) => {
    if (bread?.link) {
      navigate(bread?.link);
    }
  };

  return (
    <div className={styles.container}>
      {listProps?.map((item, index) => (
        <span
          key={index + "bread"}
          onClick={() => onClickHandler(item)}
          className={styles.name}
        >
          {item.name}
        </span>
      ))}
    </div>
  );
};
