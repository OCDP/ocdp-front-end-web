import React from "react";
import "./SettingsPage.less";

import PageContainer from "layouts/PageContainer";
import { useParams } from "react-router-dom";
import MenuBot from "components/MenuBot";

interface Props {}
const SettingsPage: React.FC<Props> = () => {
  const { id_bot } = useParams() as Dict<string>;

  return (
    <PageContainer menu={<MenuBot />}>
      <p>settings here, my bot id is {id_bot}</p>
    </PageContainer>
  );
};

export default SettingsPage;
