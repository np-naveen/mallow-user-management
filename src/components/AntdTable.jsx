import React from "react";
import { Flex, Table, Button } from "antd";

const AntdTable = ({ data }) => {
  const column = [
    {
      title: "",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => (
        <>
          <img
            src={avatar}
            style={{ width: "50px", height: "auto", borderRadius: "50%" }}
          />
        </>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <>{text}</>,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      render: (text) => <>{text}</>,
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      render: (text) => <>{text}</>,
    },
    {
      title: "Action",
      dataIndex: "id",
      key:"id",
      render: (_,record) => (<>
      <Flex gap='10px'>
        <Button type="primary">Edit</Button>
        <Button danger type="primary" variant="solid">Delete</Button>
      </Flex>
      </>)
    }
  ];
  return (
    <div>
      <Table dataSource={data} columns={column} />
    </div>
  );
};

export default AntdTable;
