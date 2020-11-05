import { Button, Menu } from "antd";
import { organizationConfig } from "configs/routesConfig";
import PageContainer from "layouts/PageContainer";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import "./OrganizationPage.less";

interface Props {}
const OrganizationPage: React.FC<Props> = () => {
  const history = useHistory();

  const navigate = useCallback(
    (link: string) => {
      history.push(link);
    },
    [history]
  );
  return (
    <PageContainer
      menu={Object.values(organizationConfig).map((item) => (
        <Menu.Item key={item}>{item}</Menu.Item>
      ))}
    >
      <Button onClick={() => navigate("/p/bots")}>go to bots</Button>
      <p>organization here</p>
    </PageContainer>
  );
};

export default OrganizationPage;
