import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";

import {
  Avatar,
  Badge,
  Dropdown,
  Flex,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";
import Icon, { BellFilled } from "@ant-design/icons";
import { useState } from "react";
import { Logo } from "../components/icons/Logo";
import Home from "../components/icons/Home";
import UserIcon from "../components/icons/UserIcon";
import { foodIcon } from "../components/icons/FoodIcon";
import BasketIcon from "../components/icons/BasketIcon";
import GiftIcon from "../components/icons/GiftIcon";
import { BarChartIcon } from "../components/icons/BarChart";
import { useMutation } from "@tanstack/react-query";
import { logoutApi } from "../http/api";

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
  const { user, logout } = useAuthStore();
  const { mutate: logoutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutApi,
    onSuccess: async () => {
      logout();
      return;
    },
  });

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
          <Header
            style={{
              paddingLeft: 16,
              paddingRight: 16,
              background: colorBgContainer,
            }}
          >
            <Flex gap='middle' align='start' justify='space-between'>
              <Badge
                text={
                  user?.role === "admin"
                    ? "You are an admin"
                    : user?.tenant?.name
                }
                status='success'
                size='small'
              />
              <Space size={16}>
                <Badge dot={true}>
                  <BellFilled />
                </Badge>
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "1",
                        label: "Notification 1",
                      },
                      {
                        key: "2",
                        label: "Notification 2",
                      },
                      {
                        key: "logout",
                        label: "Logout",
                        onClick: () => {
                          logoutMutate();
                        },
                      },
                    ],
                  }}
                  placement='bottomRight'
                >
                  <Avatar
                    style={{
                      backgroundColor: "#fde3cf",
                      color: "#f56a00",
                    }}
                  >
                    U
                  </Avatar>
                </Dropdown>
              </Space>
            </Flex>
          </Header>
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
