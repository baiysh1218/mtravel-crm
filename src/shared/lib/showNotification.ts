import { NotificationArgsProps, notification } from "antd";

interface Arguments extends NotificationArgsProps {
  type?: "error" | "success";
  message: string;
  className?: "error" | "success";
}

export const showNotification = ({
  type = "success",
  message,
  ...props
}: Arguments) => {
  notification.open({
    ...props,
    type,
    placement: "bottomRight",
    className: type == "error" ? "notification-error" : "notification",
    message: message,
  });
};
