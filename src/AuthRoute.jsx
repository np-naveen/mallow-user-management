import React, { useEffect } from "react";
import { Layout } from "antd";
import constant from "./Utils/constant";
import { useNavigate } from "react-router";
import MenuBar from "./components/MenuBar";

const { Header, Content, Footer } = Layout;

const AuthRoute = (props) => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let loggedIn = localStorage.getItem(constant.AUTH_TOKEN);
    if (!loggedIn) {
      navigate("/login");
    } else {
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      {loggedIn ? (
        <>
          <Layout>
            <Header>
              <MenuBar />
            </Header>
            <Content style={{height:'90vh', backgroundColor:'#e3e3e3'}}>{props.children}</Content>
          </Layout>
        </>
      ) : null}
    </>
  );
};

export default AuthRoute;
