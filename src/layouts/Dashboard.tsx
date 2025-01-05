import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";

import { Layout, Menu, theme } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Logo } from "../components/icons/Logo";

const { Sider, Header, Content, Footer } = Layout;

const items = [
  {
    key: "/",
    icon: <HomeOutlined />,
    label: <NavLink to='/'>Home</NavLink>,
  },
  {
    key: "/users",
    icon: <UserOutlined />,
    label: <NavLink to='/users'>Users</NavLink>,
  },
  {
    key: "/resturements",
    icon: <UserOutlined />,
    label: <NavLink to='/resturements'>Resturements</NavLink>,
  },
  {
    key: "/products",
    icon: <UserOutlined />,
    label: <NavLink to='/products'>Products</NavLink>,
  },
  {
    key: "/promos",
    icon: <UserOutlined />,
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
