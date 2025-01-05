import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";

import { Layout, Menu, theme } from "antd";
import Icon from "@ant-design/icons";
import { useState } from "react";
import { Logo } from "../components/icons/Logo";
import Home from "../components/icons/Home";
import UserIcon from "../components/icons/UserIcon";
import { foodIcon } from "../components/icons/FoodIcon";
import BasketIcon from "../components/icons/BasketIcon";
import GiftIcon from "../components/icons/GiftIcon";
import { BarChartIcon } from "../components/icons/BarChart";

const { Sider, Header, Content, Footer } = Layout;

const items = [
  {
    key: "/",
    icon: <Icon component={Home} />,
    label: <NavLink to='/'>Home</NavLink>,
  },
  {
    key: "/users",
    icon: <Icon component={UserIcon} />,
    label: <NavLink to='/users'>Users</NavLink>,
  },
  {
    key: "/restaurant",
    icon: <Icon component={foodIcon} />,
    label: <NavLink to='/restaurant'>Restaurant</NavLink>,
  },
  {
    key: "/products",
    icon: <Icon component={BasketIcon} />,
    label: <NavLink to='/products'>Products</NavLink>,
  },
  {
    key: "/sales",
    icon: <Icon component={BarChartIcon} />,
    label: <NavLink to='/products'>Sales</NavLink>,
  },
  {
    key: "/promos",
    icon: <Icon component={GiftIcon} />,
    label: <NavLink to='/promos'>Promos</NavLink>,
  },
];
export const Dashboard = () => {
  const { user } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  if (user === null) {
    return <Navigate to='/auth/login' replace={true} />;
  }

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme='light'
        >
          <div className='logo'>
            <Logo />
          </div>
          <Menu
            theme='light'
            defaultSelectedKeys={["/"]}
            mode='inline'
            items={items}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: "0 16px" }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Pizza Shop ©{new Date().getFullYear()} Created Shahariz
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};
