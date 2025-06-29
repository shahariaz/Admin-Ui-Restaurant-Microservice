import {
  Alert,
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Input,
  Layout,
  Space,
} from "antd";
import { LockFilled, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Logo } from "../../components/icons/Logo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ICredentials } from "../../types";
import { login, self, logoutApi } from "../../http/api";
import { useAuthStore } from "../../store";
import { usePermission } from "../../hooks/usePermission";
const getSelf = async () => {
  const { data } = await self();

  return data.data;
};
const loginUser = async (userData: ICredentials) => {
  const user = await login(userData);
  console.log(user);
  return user;
};
export const LoginPage = () => {
  const { isAllowed } = usePermission();
  const { setUser, logout } = useAuthStore();
  const { data: selfData, refetch } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    retry: 1,
    enabled: false,
  });
  const { mutate: logoutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutApi,
    onSuccess: async () => {
      logout();
      return;
    },
  });

  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: async () => {
      await refetch();
      if (!isAllowed(selfData)) {
        logoutMutate();
        return;
      }
      setUser(selfData);
    },
  });
  return (
    <>
      <Layout
        style={{ height: "100vh", display: "grid", placeItems: "center" }}
      >
        <Space direction='vertical' align='center' size='large'>
          <Layout.Content
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Logo />
          </Layout.Content>
          <Card
            bordered={false}
            style={{ width: 300 }}
            title={
              <Space
                style={{
                  width: "100%",
                  justifyContent: "center",
                  fontSize: 16,
                }}
              >
                <LockFilled />
                Sign in
              </Space>
            }
          >
            <Form
              initialValues={{ remember: true }}
              onFinish={(values) => {
                mutate({ email: values.username, password: values.password });
              }}
            >
              {isError && (
                <Alert
                  type='error'
                  message='Invalid Credentials'
                  showIcon
                  closable
                  style={{
                    width: "100%", // Fixed width
                    height: "60px", // Fixed height
                    marginBottom: "16px",
                    fontSize: "14px",
                    lineHeight: "12px",
                  }}
                />
              )}
              <Form.Item
                name='username'
                rules={[
                  { required: true, message: "Please input your username!" },
                  {
                    type: "email",
                    message: "Please enter a valid email",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder='Username'></Input>
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  { required: true, message: "Please input your password!" },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder='Password'
                ></Input.Password>
              </Form.Item>
              <Flex justify='space-between'>
                <Form.Item name='remember' valuePropName='checked'>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a id='login-form-fogot' href='#'>
                  Forgot password
                </a>
              </Flex>

              <Form.Item>
                <Button
                  type='primary'
                  style={{
                    width: "100%",
                  }}
                  htmlType='submit'
                  loading={isPending}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </Layout>
    </>
  );
};
