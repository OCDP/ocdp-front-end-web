import PageContainer from "layouts/PageContainer";
import React from "react";
import "./DashboardPage.less";

interface Props {}
const DashboardPage: React.FC<Props> = () => {
  return (
    <PageContainer menu={<p>menu aqui</p>}>
      <p>asdasdasd</p>
    </PageContainer>
  );
};

export default DashboardPage;
