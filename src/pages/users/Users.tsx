import { Breadcrumb, Button, Drawer, Flex, Form, Space, Spin, Table, theme } from "antd";
import { PlusOutlined, RightOutlined,LoadingOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, getUsers } from "../../http/api";
import { IUser } from "../../types";
import { useAuthStore } from "../../store";
import UsersFilters from "./UsersFilters";
import { useState } from "react";
import { UserForm } from "./forms/UserForm";
import { PER_PAGE } from "../../constants/constants";


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
  const [form] = Form.useForm();
  const queryClient =useQueryClient();
  const {
    token: { colorBgLayout },
  } = theme.useToken();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [queryParams, setQueryParams] = useState({
    perPage:PER_PAGE,
    currentPage:1,
  })
  const { user } = useAuthStore();
  const {
    data: users,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["users",queryParams],
    queryFn: async ()=>{
        const queryString = new URLSearchParams(queryParams as unknown as  Record<string,string>).toString();
         return  getUsers(queryString).then((res)=> res.data);
    },
    placeholderData: keepPreviousData
   
    
  });

 const  {mutate:userMutate} = useMutation({
    mutationKey:['create-user'],
    mutationFn:async(data:IUser)=> createUser(data),
    onSuccess:async ()=>{
      queryClient.invalidateQueries({queryKey:['users']})
    }

  })
  if (user?.role !== "admin") {
    return <Navigate to='/' replace={true} />;
  }

 

  const onHandleSubmit = async () => {
    await form.validateFields();
    await userMutate(form.getFieldsValue());
    form.resetFields();
    setDrawerOpen(false)
  };

  return (
    <>
      <Space direction='vertical' size='large' style={{ width: "100%" }}>
       <Flex justify="space-between">
         <Breadcrumb
          separator={<RightOutlined />}
          items={[{ title: <Link to='/'>Dashboard</Link> }, { title: "Users" }]}
        />

        {isFetching && (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        )}
        {isError && <div>{error.message}</div>}
       </Flex>
        <UsersFilters onFilterChange={() => {}}>
          <Button
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => setDrawerOpen(true)}
          >
            Add User
          </Button>
        </UsersFilters>
        <Table 
        columns={columns} 
        dataSource={users?.data?.data}
         rowKey={"id"} 
         pagination={{
          total: users?.data?.total,
          pageSize: queryParams.perPage,
          current: queryParams.currentPage,
          onChange: (page) => {
            setQueryParams((prev)=>{
              return{
                ...prev,
                currentPage: page,
              }
            });
          },
         }}
         />
        <Drawer
          title='Create  user'
          width={720}
          open={drawerOpen}
          destroyOnClose={true}
          onClose={() => setDrawerOpen(false)}
          extra={
            <Space>
              <Button onClick={()=> {setDrawerOpen(false) 
                    form.resetFields();}}>Cancle</Button>
              <Button type='primary' onClick={onHandleSubmit}>
                Submit
              </Button>
            </Space>
          }
          styles={{ body: { backgroundColor: colorBgLayout } }}
        >
          <Form layout='vertical' form={form} size='large'>
            <UserForm />
          </Form>
        </Drawer>
      </Space>
    </>
  );
};
