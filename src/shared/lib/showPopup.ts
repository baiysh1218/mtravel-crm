import { Modal, ModalProps } from "antd";

interface Props extends ModalProps {
  status?: "info" | "success";
  content?: string;
}

const { confirm } = Modal;

export const showPopup = ({ status = "success", content, ...props }: Props) => {
  return new Promise((resolve) =>
    confirm({
      ...props,
      closable: true,
      content,
      onOk: () => {
        resolve(true);
      },
      onCancel: () => {
        resolve(false);
      },
    }),
  );
};
