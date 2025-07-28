import React, { useEffect } from "react";
import { Form, Input, message, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { FormCard } from "../Styles";
import constant from "../Utils/constant";
import { createUser, updateUser } from "../ApiUtils/service";

const UserForm = (props) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { formData, modalAction, modalBtnLoading } = useSelector(
    (state) => state.home
  );
  const dispatch = useDispatch();

  const handleFormChange = (changedValues) => {
    dispatch({
      type: constant.FORMDATA,
      payload: { ...changedValues },
    });
  };

  const handleFormSubmit = async () => {
    try {
      dispatch({
        type: constant.MODAL_BTN_LOADING,
        payload: true,
      });

      const { first_name, last_name, profile_img_link, email } = formData;
      form.validateFields();
      if (!(first_name && last_name && profile_img_link && email)) {
        return;
      }
      let reqBody = {
       ...formData,
       avatar: formData.profile_img_link
      };
      if (modalAction.action == "create") {
        const res = await createUser(reqBody);
        if (res) {
          messageApi.open({
            type: "success",
            content: "User added successfully",
          });
          setTimeout(() => {
            dispatch({
              type: constant.MODAL_ACTION,
              payload: { visible: false, action: "" },
            });
          }, 1000);
        }
      } else {
        const res = await updateUser(modalAction.data.id,reqBody);
         if (res) {
          messageApi.open({
            type: "success",
            content: "User updated successfully",
          });
          setTimeout(() => {
            dispatch({
              type: constant.MODAL_ACTION,
              payload: { visible: false, action: "", data:{} },
            });
          }, 1000);
        }
      }
      props.callBack()
    } catch (e) {
      console.log(e);
    } finally {
      dispatch({
        type: constant.MODAL_BTN_LOADING,
        payload: false,
      });
    }
  };

  useEffect(() => {
    if (modalAction.action == "edit") {
      let obj = {
        first_name: modalAction.data.first_name,
        last_name: modalAction.data.last_name,
        email: modalAction.data.email,
        profile_img_link: modalAction.data.avatar,
      };
      dispatch({
        type: constant.FORMDATA,
        payload: obj,
      });
      form.setFieldsValue(obj);
    }
  }, []);

  return (
    <>
      {contextHolder}
      <Modal
        title={modalAction.action === "create" ? "Create User" : "Edit User"}
        open={modalAction.visible}
        closeIcon={false}
        maskClosable={false}
        onCancel={() => {
          dispatch({
            type: constant.MODAL_ACTION,
            payload: { visible: false, action: "" },
          });
        }}
        okText={"Submit"}
        onOk={handleFormSubmit}
        okButtonProps={{ loading: modalBtnLoading }}
      >
        <Form
          form={form}
          title="Create User"
          layout="vertical"
          style={{ marginTop: "20px" }}
          onValuesChange={handleFormChange}
        >
          <Form.Item
            name="first_name"
            label="First Name"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Last Name"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="profile_img_link"
            label="Profile Image Link"
            rules={[
              {
                required: true,
                message: "Please input your profile image link!",
              },
              { type: "url", message: "Please enter a valid URL!" },
            ]}
          >
            <Input placeholder="Profile Image Link" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserForm;
