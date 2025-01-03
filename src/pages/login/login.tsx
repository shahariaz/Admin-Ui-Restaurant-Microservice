import { Button, Card, Checkbox, Flex, Form, Input, Layout, Space } from "antd";
import { LockFilled, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Logo } from "../../components/icons/Logo";
export const LoginPage = () => {
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
            <Form initialValues={{ remember: true }}>
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
