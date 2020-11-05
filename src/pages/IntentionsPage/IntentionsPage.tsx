import MenuBot from "components/MenuBot";
import PageContainer from "layouts/PageContainer";
import React from "react";
import { useParams } from "react-router-dom";
import "./IntentionsPage.less";

interface Props {}
const IntentionsPage: React.FC<Props> = () => {
  const { id_bot } = useParams() as Dict<string>;
  return (
    <PageContainer menu={<MenuBot />}>
      <p>intentions here, my bot id is {id_bot}</p>
    </PageContainer>
  );
};

export default IntentionsPage;
