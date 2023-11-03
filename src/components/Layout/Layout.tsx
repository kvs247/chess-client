import { FC } from "react";
import { ConfigProvider } from "antd";
import { LayoutProps } from "./types";

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b96b",
          borderRadius: 100,
          colorBgContainer: "grey",
        },
      }}
    >
      <div>{children}</div>
    </ConfigProvider>
  );
};

export default Layout;