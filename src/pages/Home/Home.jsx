import React, { useEffect } from "react";

import { Card, Flex, Input, Button, Radio, Spin } from "antd";
import { IdcardOutlined, TableOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import { ListCard, SpinContainer, UserCardContainer } from "../../Styles";
import constant from "../../Utils/constant";
import { fetchUserData } from "../../ApiUtils/service";
import UserCard from "../../components/UserCard";
import UserForm from "../../components/UserForm";
import Table from "../../components/AntdTable";

const Home = () => {
  const dispatch = useDispatch();

  const handleModeChange = (e) => {
    const selectedMode = e.target.value;
    dispatch({
      type: constant.MODE,
      payload: selectedMode,
    });
  };

  const { mode, pageNo, userData, modalAction, loading } = useSelector(
    (state) => state.home
  );

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      dispatch({
        type: constant.LOADING,
        payload: true,
      });
      const userData = await fetchUserData(pageNo);
      dispatch({
        type: constant.USER_DATA,
        payload: userData,
      });
    } catch (e) {
      console.log(e);
    } finally {
      dispatch({
        type: constant.LOADING,
        payload: false,
      });
    }
  };

  const handleCreateUser = () => {
    dispatch({
      type: constant.MODAL_ACTION,
      payload: { visible: true, action: "create" },
    });
  };

  return (
    <div>
      <ListCard>
        <Flex align="center" justify="space-between">
          <h3>Users</h3>
          <div>
            <Flex align="center">
              <Input.Search placeholder="Search users" />
              <Button
                type="primary"
                style={{ marginLeft: "10px" }}
                onClick={handleCreateUser}
              >
                Create User
              </Button>
            </Flex>
          </div>
        </Flex>
        <div>
          <Radio.Group onChange={handleModeChange} value={mode}>
            <Radio.Button value="table">
              <Flex align="center" gap="4px">
                <TableOutlined />
                <span>Table</span>
              </Flex>
            </Radio.Button>
            <Radio.Button value="card">
              <Flex align="center" gap="4px">
                <IdcardOutlined />
                <span>Card</span>
              </Flex>
            </Radio.Button>
          </Radio.Group>
        </div>
        {loading ? (
          <>
            <SpinContainer>
              <Spin tip="Loading" size="large" />
            </SpinContainer>
          </>
        ) : (
          <>
            {userData && (
              <>
                {mode === "table" ? (
                  <Card><Table data={userData}/></Card>
                ) : (
                  <UserCardContainer>
                    <Flex wrap="wrap" gap="16px">
                      {userData.map((user) => (
                        <UserCard key={user.id} user={user} />
                      ))}
                    </Flex>
                  </UserCardContainer>
                )}
              </>
            )}
          </>
        )}
      </ListCard>
      {modalAction.visible && <UserForm />}
    </div>
  );
};

export default Home;
