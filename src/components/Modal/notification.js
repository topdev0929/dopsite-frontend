import { Button, notification, Space } from 'antd';
import React from 'react';

export const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message: message,
    description: description
  });
};