import React from "react";
import { Flex, Tooltip, Button } from "antd";
import { useNavigate } from "react-router";

import { Username } from "../Styles";
import { LogoutOutlined } from "@ant-design/icons";
import { tokenService } from "../ApiUtils/service";
import constant from "../Utils/constant";



const MenuBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    tokenService.clearToken();
    navigate("/login"); 
  }
  return (
    <>
      <Flex
        align="center"
        justify="flex-end"
        style={{ padding: "0 20px", height: "64px" }}
        gap='16px'
      >
        <Username>{localStorage.getItem(constant.USERNAME)}</Username>
        <Tooltip title="Logout">
            <Button type="primary" danger shape="circle" icon={<LogoutOutlined />} onClick={handleLogout}/>
          </Tooltip>
      </Flex>
    </>
  );
};

export default MenuBar;
