import React, { useEffect } from "react";
import { Button, Form, Input, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

import { LoginCard, LoginContainer } from "../../Styles";
import endpoint from "../../Utils/endpoint";
import { postRequest } from "../../ApiUtils/requestComponent";
import { tokenService } from "../../ApiUtils/service";
import constant from "../../Utils/constant";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleLogin = async (values) => {
    const { username, password } = values;
    if (!username || !password) {
      form.validateFields();
      return;
    }
    const response = await postRequest(endpoint.LOGIN, {
      username,
      password,
    });
    if (response) {
      localStorage.setItem(constant.USERNAME,username)
      tokenService.setToken(response.token);
      navigate("/");
    }
  };
  useEffect(() => {
    tokenService.getToken() && navigate("/");
  }, []);
  return (
    <LoginContainer>
      <LoginCard>
        <Form form={form} onFinish={handleLogin}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              size="large"
              placeholder="Username"
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              size="large"
              placeholder="Password"
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Checkbox>Remember Me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" block size="large" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
