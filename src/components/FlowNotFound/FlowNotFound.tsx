import React from "react";
import "./FlowNotFound.less";

import { Result } from "antd";

interface Props {}
const FlowNotFound: React.FC<Props> = () => {
  return (
    <Result
      status="404"
      title="Não foi possível encontrar o fluxo selecionado."
    />
  );
};

export default FlowNotFound;
