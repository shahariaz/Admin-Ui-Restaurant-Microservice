import { Card, Col, Form, Input, Row, Select, Space } from "antd";
import { getTenants } from "../../../http/api";
import { useQuery } from "@tanstack/react-query";
import { Tenant } from "../../../types";

export const UserForm = () => {
  const { data: tenants } = useQuery({
    queryKey: ["tenants"],
    queryFn: async () => {
      return getTenants().then((res) => res.data.data);
    },
  });

  return (
    <Row>
      <Col span={24}>
        <Space direction='vertical' size='large'>
          <Card title='Basic info' bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label='First name' name='firstName'>
                  <Input size='large' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label='Last name' name='lastName'>
                  <Input size='large' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label='Email'
                  name='email'
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input size='large' />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title='Security info' bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label='Passoword'
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    {
                      min: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  ]}
                >
                  <Input size='large' type='password' />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title='Role' bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label='Role'
                  name='role'
                  rules={[
                    {
                      required: true,
                      message: "Please select a role!",
                    },
                  ]}
                >
                  <Select
                    size='large'
                    style={{ width: "100%" }}
                    allowClear={true}
                    onChange={() => {}}
                    placeholder='Select role'
                  >
                    <Select.Option value='admin'>Admin</Select.Option>
                    <Select.Option value='manager'>Manager</Select.Option>
                    <Select.Option value='customer'>Customer</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label='Restaurant'
                  name='tenantId'
                  rules={[
                    {
                      required: true,
                      message: "Please select a restaurant!",
                    },
                  ]}
                >
                  <Select
                    size='large'
                    style={{ width: "100%" }}
                    allowClear={true}
                    onChange={() => {}}
                    placeholder='Select restaurant'
                  >
                    {tenants?.map((tenant: Tenant) => (
                      <Select.Option value={tenant.id} key={tenant.id}>
                        {tenant.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Space>
      </Col>
    </Row>
  );
};
