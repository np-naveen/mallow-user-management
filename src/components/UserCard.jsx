import React, { useEffect } from "react";
import { Card, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { Overlay, ProfileCard, ProfileImage } from "../Styles";
import UserForm from "./UserForm";
import constant from "../Utils/constant";

const UserCard = ({ user,handleDelete }) => {
  const dispatch = useDispatch();
  const { modalAction } = useSelector((state) => state.home);

  const handleEdit = () => {
    dispatch({
      type: constant.MODAL_ACTION,
      payload: { visible: true, action: "edit", data: user },
    });
  };

  return (
    <>
      <Card key={user.id} style={{ width: 300 }}>
        <ProfileCard>
          <Overlay>
            <Button shape="circle" type="primary" onClick={handleEdit} icon={<EditOutlined />} />
            <Button shape="circle" type="primary" danger onClick={()=>{handleDelete(user)}} icon={<DeleteOutlined />} />
          </Overlay>
          <ProfileImage src={user.avatar} alt={user.name} preview={false} />
          <h3>{`${user.first_name} ${user.last_name}`}</h3>
          <p>{user.email}</p>
        </ProfileCard>
      </Card>
    </>
  );
};

export default UserCard;
