import { notification } from "antd";

export const openNotificationWithIcon = (type, title, message = "") => {
  if (type) {
    notification[type]({
      message: title,
      description: message,
    });
  }

  return {
    error: (errMsg = "") =>
      openNotificationWithIcon("error", "Something went wrong!", errMsg),
  };
};
