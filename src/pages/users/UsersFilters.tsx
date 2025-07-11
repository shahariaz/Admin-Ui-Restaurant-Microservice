import { Card, Col, Input, Row, Select } from "antd";

type UserFilterProps = {
  onFilterChange: (filterName: string, filterValue: string) => void;
  children?: React.ReactNode;
};

const UsersFilter = ({ onFilterChange, children }: UserFilterProps) => {
  return (
    <Card>
      <Row justify='space-between'>
        <Col span={16}>
          <Row gutter={20}>
            <Col span={8}>
              <Input.Search
                placeholder='Search'
                allowClear={true}
                onChange={(e) =>
                  onFilterChange("UserSearchQuery", e.target.value)
                }
              />
            </Col>
            <Col span={8}>
              <Select
                onChange={(value) => onFilterChange("roleFilter", value)}
                style={{ width: "100%" }}
                allowClear={true}
                placeholder='Select role'
              >
                <Select.Option value='admin'>Admin</Select.Option>
                <Select.Option value='manager'>Manager</Select.Option>
                <Select.Option value='customer'>Customer</Select.Option>
              </Select>
            </Col>
            <Col span={8}>
              <Select
                style={{ width: "100%" }}
                placeholder='Status'
                onChange={(value) => onFilterChange("statusFilter", value)}
              >
                <Select.Option value='ban'>Ban</Select.Option>
                <Select.Option value='active'>Active</Select.Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "end" }}>
          {children}
        </Col>
      </Row>
    </Card>
  );
};

export default UsersFilter;
