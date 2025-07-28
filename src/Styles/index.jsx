import styled from "styled-components";
import { Card, Image } from "antd";

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoginCard = styled(Card)`
  width: 400px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
`;

export const Username = styled.p`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  text-align: center;
`;

export const ListCard = styled(Card)`
  margin: 20px;
  border-radius: 0px;
`;

export const ProfileImage = styled(Image)`
  width: 100%;
  height: auto;
  border-radius: 50%;
`;

export const UserCardContainer = styled.div`
  width: 980px;
  margin: 20px auto;
`;

export const FormCard = styled(Card)`
  width: 500px;
  margin: 20px auto;
`;
export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6); // transparent black
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1
`;

export const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  p {
    margin: 0;
    font-size: 14px;
  }
  h3 {
    margin: 0;
  }
  &:hover ${Overlay} {
    opacity: 1;
  }
`;

export const SpinContainer = styled.div`
  width:100px;
  margin:auto;
  height:400px;
`
