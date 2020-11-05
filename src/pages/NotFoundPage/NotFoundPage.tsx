/* eslint-disable react/jsx-no-target-blank */
import React, { useContext } from "react";
import "./NotFoundPage.less";
import { Result, Button, Space, Divider } from "antd";
import UserContext from "contexts/UserContext";
import { useHistory } from "react-router-dom";
import { NotFound } from "icons";

const NotFoundPage: React.FC = () => {
  const { isAuthenticated } = useContext(UserContext);
  const history = useHistory();

  const navigate = () => {
    if (isAuthenticated) {
      history.replace("/p/");
    } else {
      history.replace("/login");
    }
  };

  return (
    <>
      <Space
        direction="horizontal"
        align="center"
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Result
          title="Oops!"
          subTitle="A página que você tentou acessar não está disponível."
          extra={
            <Space direction="vertical">
              <NotFound />
              <Divider />
              <Button onClick={navigate} type="primary">
                Voltar
              </Button>
            </Space>
          }
        />
      </Space>
    </>
  );
};

export default NotFoundPage;
