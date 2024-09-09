import clsx from "clsx";

import styles from "./styles.module.scss";
import { AllIcons } from "./types.ts";

interface Props {
  className?: string;
  width?: number;
  height?: number;
  id: AllIcons;

  onClick?(e: React.MouseEvent<HTMLElement, MouseEvent>): void;

  style?: React.CSSProperties;
}

export const AppIcon = ({
  className,
  width = 20,
  height = 20,
  id,
  onClick,
  ...props
}: Props) => {
  return (
    <span
      {...props}
      onClick={onClick}
      style={{ width, height }}
      className={clsx(styles.wrapper, className)}
    >
      <svg width={width} height={height}>
        <use xlinkHref={`/sprite.svg#${id}`} />
      </svg>
    </span>
  );
};
