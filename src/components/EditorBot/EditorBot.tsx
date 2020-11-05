import React from "react";
import "./EditorBot.less";

import { Result, Space } from "antd";
import useSharedState from "hooks/useSharedState";
import engineStore from "store/engineStore";
import flowStore from "store/flowStore";
import FadeLoading from "components/FadeLoading";
import { NotFound } from "icons";

interface Props {}
const EditorBot: React.FC<Props> = () => {
  const [{ canvasReady }] = useSharedState(engineStore);
  const [flow] = useSharedState(flowStore);

  return (
    <>
      {flow ? (
        canvasReady ? (
          <div>flow root ficava aq antes </div>
        ) : (
          <FadeLoading loading />
        )
      ) : (
        <Space style={{ height: "calc(100vh - 64px)" }}>
          <Result
            title="Nenhum fluxo selecionado"
            subTitle="Selecione um fluxo para iniciar"
            extra={<NotFound />}
          />
        </Space>
      )}
    </>
  );
};

export default EditorBot;
