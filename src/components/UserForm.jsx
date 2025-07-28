import React, { useEffect } from "react";
import { Form, Input, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { FormCard } from "../Styles";
import constant from "../Utils/constant";

const UserForm = (props) => {

  const [form] = Form.useForm();
  const { formData, modalAction } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  const handleFormChange = (changedValues) => {
    dispatch({
      type: constant.FORMDATA,
      payload: { changedValues },
    });
  };

  const handleFormSubmit = () => {
    form.validateFields();
  };

  return (
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
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input placeholder="First Name" value={formData.first_name} />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input placeholder="Last Name" value={formData.last_name} />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input placeholder="Email" value={formData.email} />
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
          <Input
            placeholder="Profile Image Link"
            value={formData.profile_img_link}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserForm;
