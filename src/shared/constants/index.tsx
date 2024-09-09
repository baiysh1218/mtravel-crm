import { AppIcon } from "@/shared/icons/app-icon";
import { AllIcons } from "@/shared/icons/app-icon/types.ts";

export interface CurrentStatusTransaction {
  color: string;
  label: string;
}

export const ROUTER_NAVIGATION = {
  MAIN: "/",
  AUTH: "/auth",
  DETAIL_APPLICATION: "/detail_application",
  TRANSACTIONS: "/transactions",
  ICONS: "/icons",
  CREATE_APPLICATION: "/create_application",
};

interface Role {
  redirect?: string;
  paths?: Record<string, ROUTER_NAVIGATION>;
}

type ROUTER_NAVIGATION =
  (typeof ROUTER_NAVIGATION)[keyof typeof ROUTER_NAVIGATION];

type ROLE = Record<string, Role>;

export enum ACCESS_USER {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  ACCOUNTANT = "ACCOUNTANT",
}

export const ACCESS_DENIED_ROLE: ROLE = {
  [ACCESS_USER.ADMIN]: {},
  [ACCESS_USER.MANAGER]: {
    redirect: ROUTER_NAVIGATION.MAIN,
    paths: {
      [ROUTER_NAVIGATION.TRANSACTIONS]: ROUTER_NAVIGATION.TRANSACTIONS,
    },
  },
  [ACCESS_USER.ACCOUNTANT]: {
    redirect: ROUTER_NAVIGATION.TRANSACTIONS,
    paths: {
      [ROUTER_NAVIGATION.MAIN]: ROUTER_NAVIGATION.MAIN,
      [ROUTER_NAVIGATION.CREATE_APPLICATION]:
        ROUTER_NAVIGATION.CREATE_APPLICATION,
      [ROUTER_NAVIGATION.DETAIL_APPLICATION]:
        ROUTER_NAVIGATION.DETAIL_APPLICATION,
    },
  },
};

export const LIST_SIDER_NAVIGATION = {
  [ACCESS_USER.ADMIN]: [
    {
      label: "Главная",
      key: ROUTER_NAVIGATION.MAIN,
      icon: <AppIcon id={AllIcons.HOME} />,
    },
    {
      label: "Транзакции",
      key: ROUTER_NAVIGATION.TRANSACTIONS,
      icon: <AppIcon id={AllIcons.TRANSACTIONS} />,
    },
  ],
  [ACCESS_USER.MANAGER]: [
    {
      label: "Главная",
      key: ROUTER_NAVIGATION.MAIN,
      icon: <AppIcon id={AllIcons.HOME} />,
    },
  ],
  [ACCESS_USER.ACCOUNTANT]: [
    {
      label: "Транзакции",
      key: ROUTER_NAVIGATION.TRANSACTIONS,
      icon: <AppIcon id={AllIcons.TRANSACTIONS} />,
    },
  ],
};

export enum REQUEST_STATUS {
  ALL = "ALL",
  WORKING = "IN_PROGRESS",
  AVIA = "AWAITING_PARTNER",
  NEW = "OPEN",
  CLOSED = "CLOSED",
}

export enum STATUS_TICKET {
  PAID = "PAID",
  PENDING = "PENDING",
  USED = "USED",
  REFUNDED = "REFUNDED",
  REISSUED = "REISSUED",
  BOOKED = "BOOKED",
}

export enum TYPE_APPLICATION {
  ALL = "all",
  REFUND = "TICKET_REFUND",
  EXCHANGE = "TICKET_TRADE",
  ADDITIONAL_SERVICE = "ADDITIONAL_SERVICE",
  OTHER = "OTHER",
}

export enum STATUS_PAYMENT {
  CREATED = 1,
  IN_PROGRESS = 2,
  SUCCESS = 3,
  CANCELLED = 0,
}

export const REQUEST_STATUS_COLOR = {
  [REQUEST_STATUS.ALL]: "rgba(214, 215, 220, 1)",
  [REQUEST_STATUS.WORKING]: "rgba(24, 144, 255, 1)",
  [REQUEST_STATUS.AVIA]: "rgba(250, 173, 20, 1)",
  [REQUEST_STATUS.NEW]: "rgba(246, 63, 72, 1)",
  [REQUEST_STATUS.CLOSED]: "rgba(56, 158, 13, 1)",
};

export const LOCALE_STORAGE_KEY = {
  ACCESS: "mtravel_crm_access",
  REFRESH: "mtravel_crm_refresh",
};

export const STATUS_NAMES_APPLICATION = {
  [TYPE_APPLICATION.ALL]: "Все",
  [TYPE_APPLICATION.REFUND]: "Возврат билета",
  [TYPE_APPLICATION.EXCHANGE]: "Обмен билета",
  [TYPE_APPLICATION.ADDITIONAL_SERVICE]: "Заказ доп. услуги",
  [TYPE_APPLICATION.OTHER]: "Другое",
};

export const REQUEST_NAME_STATUS = {
  [REQUEST_STATUS.ALL]: "Все",
  [REQUEST_STATUS.WORKING]: "В работе",
  [REQUEST_STATUS.AVIA]: "На стороне авиакассы",
  [REQUEST_STATUS.NEW]: "Новое",
  [REQUEST_STATUS.CLOSED]: "Закрытое",
};

export const LIST_STATUS_APPLICATION = [
  {
    value: REQUEST_STATUS.WORKING,
    label: REQUEST_NAME_STATUS[REQUEST_STATUS.WORKING],
    color: REQUEST_STATUS_COLOR[REQUEST_STATUS.WORKING],
  },
  {
    value: REQUEST_STATUS.AVIA,
    color: REQUEST_STATUS_COLOR[REQUEST_STATUS.AVIA],
    label: REQUEST_NAME_STATUS[REQUEST_STATUS.AVIA],
  },
  {
    value: REQUEST_STATUS.NEW,
    color: REQUEST_STATUS_COLOR[REQUEST_STATUS.NEW],
    label: REQUEST_NAME_STATUS[REQUEST_STATUS.NEW],
  },
  {
    value: REQUEST_STATUS.CLOSED,
    color: REQUEST_STATUS_COLOR[REQUEST_STATUS.CLOSED],
    label: REQUEST_NAME_STATUS[REQUEST_STATUS.CLOSED],
  },
];

export const LIST_TRANSACTION_STATUS = {
  [STATUS_PAYMENT.CANCELLED]: {
    color: "rgb(255, 99, 71)",
    label: "Закрыто",
  },
  [STATUS_PAYMENT.CREATED]: {
    color: "rgba(24, 144, 255, 1)",
    label: "Создан",
  },
  [STATUS_PAYMENT.IN_PROGRESS]: {
    color: "rgb(255, 255, 0)",
    label: "В обработке",
  },
  [STATUS_PAYMENT.SUCCESS]: {
    color: "rgba(56, 158, 13, 1)",
    label: "Закрыто",
  },
};

export enum TYPE_AGE {
  ADULT = "adt",
  CHILD = "chd",
  INFANT = "inf",
}

export const AGE_NAME: Record<string, string> = {
  [TYPE_AGE.ADULT]: "Взрослый",
  [TYPE_AGE.CHILD]: "Ребенок",
  [TYPE_AGE.INFANT]: "Младенец",
};

export const GENDER_NAME: Record<string, string> = {
  M: "Мужской",
  W: "Женский",
};

export enum TRANSACTION_STATUS {
  ALL = "",
  CREATED = 1,
  PENDING = 2,
  SUCCESS = 3,
  ERROR = 0,
}

export const TRANSACTION_STATUS_COLOR = [
  {
    label: "Все",
    key: TRANSACTION_STATUS.ALL,
    color: "rgba(214, 215, 220, 1)",
  },
  {
    label: "Создано",
    key: TRANSACTION_STATUS.CREATED,
    color: "rgba(24, 144, 255, 1)",
  },
  {
    label: "В обработке",
    key: TRANSACTION_STATUS.PENDING,
    color: "rgba(250, 173, 20, 1)",
  },
  {
    label: "Успешно",
    key: TRANSACTION_STATUS.SUCCESS,
    color: "rgba(56, 158, 13, 1)",
  },
  {
    label: "Отклонено",
    key: TRANSACTION_STATUS.ERROR,
    color: "rgba(246, 63, 72, 1)",
  },
];
