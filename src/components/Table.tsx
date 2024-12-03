import { Table, Button, Popconfirm } from "antd";
import React from "react";

interface User {
  key: string;
  username: string;
  age: number | string;
  profession: string;
}

type Props = {
  existingUsers: User[];
  onDelete: (key: string) => void; // Callback to delete a user
};

const UserTable: React.FC<Props> = ({ existingUsers, onDelete }) => {
  const columns = [
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Profession",
      dataIndex: "profession",
      key: "profession",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: User) => (
        <Popconfirm
          title="Are you sure to delete this user?"
          onConfirm={() => onDelete(record.key)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return <Table columns={columns} dataSource={existingUsers} pagination={false}/>;
};

export default UserTable;
