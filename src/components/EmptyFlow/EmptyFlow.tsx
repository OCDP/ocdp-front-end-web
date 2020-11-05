import React from "react";
import "./EmptyFlow.less";

import { Result } from "antd";

interface Props {}
const EmptyFlow: React.FC<Props> = () => {
  return (
    <Result
      status="404"
      title="Nenhum fluxo selecionado"
      subTitle="Selecione um fluxo para iniciar"
    />
  );
};

export default EmptyFlow;
