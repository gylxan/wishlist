import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useRef,
  useState,
} from 'react';
import { Notification as NotificationComponent } from '../components/notification/notification';
import { Notifications } from '../components/notifications/notifications';

export type Notification = {
  type: 'error' | 'success';
  message: ReactNode;
};

type NotificationWithId = Notification & {
  id: number;
};

type NotificationContextValues = {
  notifications: NotificationWithId[];
  showNotification: (notification: Notification) => void;
};

const NotificationContext = createContext<NotificationContextValues>({
  notifications: [],
  showNotification: () => undefined,
});

type NotificationWrapperProps = PropsWithChildren;
export function NotificationWrapper({ children }: NotificationWrapperProps) {
  const ids = useRef(0);

  const [notifications, setNotifications] = useState<NotificationWithId[]>([]);

  const showNotification = (notification: Notification) => {
    ids.current += 1;
    setNotifications((notifications) => [
      ...notifications,
      { ...notification, id: ids.current },
    ]);
  };

  const handleDismiss = (id: number) => {
    setNotifications((notifications) =>
      notifications.filter((notification) => notification.id !== id),
    );
  };

  return (
    <NotificationContext.Provider value={{ notifications, showNotification }}>
      <Notifications>
        {notifications.map(({ message, type, id }) => (
          <NotificationComponent
            key={id}
            type={type}
            id={id as number}
            onDismiss={handleDismiss}
          >
            {message}
          </NotificationComponent>
        ))}
      </Notifications>
      {children}
    </NotificationContext.Provider>
  );
}
export function useNotificationContext() {
  return useContext(NotificationContext);
}
