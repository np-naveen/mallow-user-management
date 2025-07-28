import React, { useEffect } from "react";
import { Card, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { Overlay, ProfileCard, ProfileImage } from "../Styles";
import UserForm from "./UserForm";
import constant from "../Utils/constant";

const UserCard = ({ user }) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const dispatch = useDispatch();
  const { modalAction } = useSelector((state) => state.home);

  const handleEdit = () => {
    console.log("handleEdit");
    setIsEdit(true);
    dispatch({
      type: constant.MODAL_ACTION,
      payload: { visible: true, action: "edit", data: user },
    });
  };

  useEffect(() => {
    console.log(isEdit, modalAction);
  }, [isEdit, modalAction]);
  return (
    <>
      <Card key={user.id} style={{ width: 300 }}>
        <ProfileCard>
          <Overlay>
            <Button type="primary" onClick={handleEdit}>
              Edit
            </Button>
            <Button danger>Delete</Button>
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
