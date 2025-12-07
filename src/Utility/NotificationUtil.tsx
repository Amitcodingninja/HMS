import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

const successNotification = (message: string) => {
  notifications.show({
    title: "Success",
    message: message,
    color: "teal",
    icon: <IconCheck />,
    // autoClose: 3000,
    withCloseButton: true,
    withBorder: true,
    className: "!bg-green-500",
  });
}

const errorNotification = (message: string) => {
  notifications.show({
    title: "Error",
    message: message,
    color: "red",
    icon: <IconX />,
    // autoClose: 3000,
    withCloseButton: true,  
    withBorder: true,
    className: "!bg-red-500",
    });
}

export { successNotification, errorNotification }; 
