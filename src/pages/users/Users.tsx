import { Breadcrumb, Space, Table } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../http/api";
import { IUser } from "../../types";
import { useAuthStore } from "../../store";
import UsersFilters from "./UsersFilters";
const getData = async () => {
  const { data } = await getUsers();
  return data.data;
};

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "firstName",
    key: "firstName",
    render: (_text: string, record: IUser) => {
      return (
        <div>
          {record.firstName} {record.lastName}
        </div>
      );
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
];

export const Users = () => {
  const { user } = useAuthStore();
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getData,
  });

  if (user?.role !== "admin") {
    return <Navigate to='/' replace={true} />;
  }
  return (
    <>
      <Space direction='vertical' size='large' style={{ width: "100%" }}>
        <Breadcrumb
          separator={<RightOutlined />}
          items={[{ title: <Link to='/'>Dashboard</Link> }, { title: "Users" }]}
        />

        {isLoading && <div>Loading...</div>}
        {isError && <div>{error.message}</div>}
        <UsersFilters onFilterChange={() => {}} />
        <Table columns={columns} dataSource={users} rowKey={"id"} />
      </Space>
    </>
  );
};
