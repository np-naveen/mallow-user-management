import React, { useEffect } from "react";

import {
  Card,
  Flex,
  Input,
  Button,
  Radio,
  Spin,
  Pagination,
  message,
} from "antd";
import { IdcardOutlined, TableOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import { ListCard, SpinContainer, UserCardContainer } from "../../Styles";
import constant from "../../Utils/constant";
import { deleteUser, fetchUserData } from "../../ApiUtils/service";
import UserCard from "../../components/UserCard";
import UserForm from "../../components/UserForm";
import Table from "../../components/AntdTable";

const Home = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const handleModeChange = (e) => {
    const selectedMode = e.target.value;
    dispatch({
      type: constant.MODE,
      payload: selectedMode,
    });
  };

  const { mode, pageDetails, userData, modalAction, loading } = useSelector(
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
      const userData = await fetchUserData(pageDetails.currentPage);
      dispatch({
        type: constant.USER_DATA,
        payload: userData.data,
      });
      dispatch({
        type: constant.PAGE_DETAILS,
        payload: { totalRecord: userData.total },
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

  const handlePageChange = async (page) => {
    try {
      dispatch({
        type: constant.LOADING,
        payload: true,
      });
      const userData = await fetchUserData(page);
      dispatch({
        type: constant.USER_DATA,
        payload: userData.data,
      });
      dispatch({
        type: constant.PAGE_DETAILS,
        payload: { totalRecord: userData.total, currentPage: page },
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

  const onSearch = (value) => {
    dispatch({
      type: constant.PAGE_DETAILS,
      payload: { totalRecord: "", currentPage: 1 },
    });
    if (value.trim() == "") {
      init();
    } else {
      const filterData = userData.filter(
        (item) =>
          item.first_name.toLowerCase().includes(value.toLowerCase()) ||
          item.last_name.toLowerCase().includes(value.toLowerCase())
      );
      dispatch({
        type: constant.USER_DATA,
        payload: filterData,
      });
    }
  };

  const handleDelete = async (data) => {
    try {
      const res = await deleteUser(data.id);
      let filterData = userData.filter((item) => item.id != data.id);
      dispatch({
        type: constant.USER_DATA,
        payload: filterData,
      });
      messageApi.success('User Deleted Successfully')
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {contextHolder}
      <ListCard>
        <Flex align="center" justify="space-between">
          <h3>Users</h3>
          <div>
            <Flex align="center">
              <Input.Search placeholder="Search users" onSearch={onSearch} />
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
                  <Card>
                    <Table data={userData} handleDelete={handleDelete} />
                  </Card>
                ) : (
                  <UserCardContainer>
                    <Flex wrap="wrap" gap="16px">
                      {userData.map((user) => (
                        <UserCard key={user.id} user={user} handleDelete={handleDelete}/>
                      ))}
                    </Flex>
                  </UserCardContainer>
                )}
                <Pagination
                  align="end"
                  defaultCurrent={1}
                  total={pageDetails.totalRecord}
                  onChange={handlePageChange}
                  current={pageDetails.currentPage}
                />
              </>
            )}
          </>
        )}
      </ListCard>
      {modalAction.visible && <UserForm callBack={init} />}
    </div>
  );
};

export default Home;
