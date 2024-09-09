import type { ThemeConfig } from "antd";

import { useGetCssColor } from "@/shared/helper/useGetCssColor.ts";

import "./styles/vars/_colors.scss";

export const configProvider: ThemeConfig = {
  token: {
    colorPrimary: useGetCssColor("--siren"),
  },
  components: {
    Menu: {
      horizontalLineHeight: 2.5,
      colorPrimary: useGetCssColor("--siren"),
      colorText: useGetCssColor("--light-blue-3"),
      colorSplit: useGetCssColor("--light-blue-2"),
      padding: 10,
    },
    Table: {
      fontSize: 13,
      headerBorderRadius: 10,
      rowExpandedBg: useGetCssColor("--light-grey"),
    },
    Select: {
      paddingXS: 20,
      borderRadius: 8,
      borderRadiusLG: 10,
      colorTextPlaceholder: useGetCssColor("--light-blue-3"),
      colorBorder: useGetCssColor("--light-blue-2"),
      colorBgContainer: useGetCssColor("--light-grey"),
      colorPrimary: useGetCssColor("--siren"),
    },
  },
};
