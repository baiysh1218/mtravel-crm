import { clsx } from "clsx";
import { FC, useState } from "react";

import styles from "./styles.module.scss";

export interface ButtonProps {
  key: string;
  name: string;
  color?: string;
  count?: number | string;
}

interface Props {
  buttons?: ButtonProps[];
  onClick?: (key: string) => void;
  isLoading?: boolean;
  defaultValue?: string;
}

const DEFAULT_COLOR = "rgba(214, 215, 220, 1)";

export const StatusButton: FC<Props> = (props) => {
  const { buttons, isLoading, defaultValue, onClick } = props;

  const [active, onActive] = useState<string>(defaultValue || "");

  const onClickHandler = (data: ButtonProps) => {
    if (active === data.key) {
      onClick?.("");
      onActive("");

      return;
    }

    onClick?.(data?.key);
    onActive(data.key);
  };

  return (
    <div className={styles.container}>
      {buttons?.map((item, index) => (
        <button
          key={"btn" + index}
          disabled={isLoading}
          onClick={() => onClickHandler(item)}
          className={clsx(
            item.key === active ? styles.activeButton : "",
            styles.button,
          )}
          style={{
            background: active == item.key ? item.color || DEFAULT_COLOR : "",
          }}
        >
          <span
            className={styles.color}
            style={{ background: item.key === active ? "white" : item.color }}
          />

          <span className={styles.name}> {item.name} </span>

          <span className={styles.count}>{item?.count || "0"}</span>
        </button>
      ))}
    </div>
  );
};
