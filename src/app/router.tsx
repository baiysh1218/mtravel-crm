import { ConfigProvider } from "antd";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { globalBuddhistLocale } from "@/app/locale.ts";
import { useGetMeMutation } from "@/entities/profile/api/api.ts";
import { AuthPage } from "@/pages/auth-page";
import { CreateApplicationPage } from "@/pages/create-application";
import { DetailApplication } from "@/pages/detail-application";
import { IconsPage } from "@/pages/icons/icons.tsx";
import { MainPage } from "@/pages/main-page";
import { TransactionsPage } from "@/pages/transactions";
import {
  ACCESS_DENIED_ROLE,
  LOCALE_STORAGE_KEY,
  ROUTER_NAVIGATION,
} from "@/shared/constants";
import {
  getLocalStore,
  getSessionStore,
} from "@/shared/helper/useLocaleKey.ts";
import { useAppSelector } from "@/shared/lib/hooks.ts";
import { SiderApplication } from "@/shared/ui/sider";
import { CommonData } from "@/widgets/application/ui/detail-application";
import { DetailTicket } from "@/widgets/application/ui/detail-ticket";
import { TicketsList } from "@/widgets/application/ui/detail-tickets-list";

import { configProvider } from "./config-provider.tsx";

const ROUTER = {
  COMMON_DATA: "",
  TICKETS: "tickets",
  DETAIL: "detail",
};

const RouterApp: FC = () => {
  return (
    <ConfigProvider locale={globalBuddhistLocale} theme={configProvider}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTER_NAVIGATION.ICONS} element={<IconsPage />} />
          <Route path={ROUTER_NAVIGATION.AUTH} element={<AuthPage />} />
          <Route path={ROUTER_NAVIGATION.MAIN} element={<AuthorizedUser />}>
            <Route path={ROUTER_NAVIGATION.MAIN} element={<MainPage />} />
            <Route
              path={ROUTER_NAVIGATION.DETAIL_APPLICATION + "/:id/*"}
              element={<DetailApplication />}
            >
              {ListDetailRequest?.map((item) => (
                <Route
                  path={item.path}
                  element={item.element}
                  key={item.path}
                />
              ))}
            </Route>
            <Route
              path={ROUTER_NAVIGATION.TRANSACTIONS}
              element={<TransactionsPage />}
            />
            <Route
              path={ROUTER_NAVIGATION.CREATE_APPLICATION}
              element={<CreateApplicationPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

const AuthorizedUser: FC = () => {
  const navigate = useNavigate();

  const [auth] = useGetMeMutation();
  const { pathname } = useLocation();
  const { user } = useAppSelector((state) => state.userStore);

  useEffect(() => {
    const tokenAccess =
      getSessionStore(LOCALE_STORAGE_KEY.ACCESS) ||
      getLocalStore(LOCALE_STORAGE_KEY.ACCESS);

    if (tokenAccess.length && user === undefined) {
      auth();

      return;
    }

    if (!tokenAccess.length && user === undefined) {
      navigate(ROUTER_NAVIGATION.AUTH);
    }
  }, []);

  if (!user) return null;

  const currentRole = ACCESS_DENIED_ROLE[user.role];

  if (currentRole?.paths?.[pathname]) {
    location.replace(currentRole.redirect || "/");
  }

  return (
    <SiderApplication>
      <Outlet />
    </SiderApplication>
  );
};

const ListDetailRequest = [
  {
    path: ROUTER.COMMON_DATA,
    element: <CommonData />,
  },
  {
    path: ROUTER.TICKETS,
    element: <TicketsList />,
  },
  {
    path: ROUTER.DETAIL,
    element: <DetailTicket />,
  },
];

export default RouterApp;
