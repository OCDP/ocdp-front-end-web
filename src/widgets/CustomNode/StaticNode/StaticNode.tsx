import React, { memo, useCallback, useContext, useState } from "react";
import "widgets/CustomNode/CustomNode.less";

import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import StaticNodeModel from "./StaticNode.model";
import getCorner from "utils/getCorner";
import CustomPort from "widgets/CustomPort";
import {
  Message,
  Script,
  Declaration,
  Input,
  Request,
  Forward,
} from "components/NodeManagers";
import useMountEffect from "hooks/lifecycle/useMountEffect";
import useUnmountEffect from "hooks/lifecycle/useUnmountEffect";
import { flowIcons, nodeHasOutPort } from "configs/flowConfig";
import { Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import AppContext from "contexts/AppContext";

const Separator: React.FC = ({ children }) => (
  <>
    <div style={{ flex: 1 }} />
    {children}
  </>
);

interface Props {
  node: StaticNodeModel;
  engine: DiagramEngine;
}

const distance = -1.2;

const StaticNode: React.FC<Props> = ({ node, engine }) => {
  const [selected, setSelected] = useState(false);
  const { openDrawer, closeDrawer } = useContext(AppContext);
  const [rerenderNode, setRerenderNode] = useState(true);

  useMountEffect(() => {
    node?.registerListener({
      selectionChanged: ({ isSelected = false }: any) => {
        setSelected(isSelected);
      },
    });
  });

  useUnmountEffect(() => node?.clearListeners());

  const openAdvancedSettings = useCallback(() => {
    openDrawer({
      title:
        node.nodeType === "message" ? "Editar mensagens" : "Editar entrada",
      size: "lg",
      content:
        node.nodeType === "message" ? (
          <Message advanced node={node} />
        ) : (
          <Input advanced node={node} />
        ),
      onOk: () => {
        closeDrawer();
        setRerenderNode(false);
        setTimeout(() => {
          setRerenderNode(true);
        });
      },
    });
  }, [closeDrawer, node, openDrawer]);

  return (
    <div
      className={`custom-node ${node.nodeType} ${selected ? "selected" : ""}`}
    >
      {node.nodeType !== "start" && node.getPort("in") && (
        <CustomPort
          engine={engine}
          port={node.getPort("in")}
          className="in"
          style={getCorner("left", distance)}
        />
      )}

      <div className="custom-node-content">
        <div className="custom-node-header">
          {flowIcons[node.nodeType]}
          <div
            style={
              node?.value?.mainLabel
                ? { lineHeight: "18px", padding: "10.5px 0" }
                : {}
            }
          >
            {node.label}
            <br />
            {node?.value?.mainLabel && <small>{node.value.mainLabel}</small>}
          </div>
          {node.nodeType === "script" && (
            <Separator>
              <Script node={node} engine={engine} />
            </Separator>
          )}
          {node.nodeType === "request" && (
            <Separator>
              <Request node={node} engine={engine} />
            </Separator>
          )}
          {node.nodeType === "message" && (
            <Separator>
              <Button
                onClick={openAdvancedSettings}
                icon={<SettingOutlined />}
                type="text"
              />
            </Separator>
          )}
          {node.nodeType === "input" && (
            <Separator>
              <Button
                onClick={openAdvancedSettings}
                icon={<SettingOutlined />}
                type="text"
              />
            </Separator>
          )}
        </div>
        <div className="custom-node-body">
          {node.nodeType === "message" && rerenderNode && (
            <Message node={node} />
          )}
          {node.nodeType === "declaration" && <Declaration node={node} />}
          {node.nodeType === "input" && rerenderNode && <Input node={node} />}
          {node.nodeType === "forward" && <Forward node={node} />}
        </div>
      </div>

      {nodeHasOutPort[node.nodeType] && node.getPort("out") && (
        <CustomPort
          engine={engine}
          port={node.getPort("out")!}
          className="out"
          style={getCorner("right", distance)}
        />
      )}
    </div>
  );
};

export default memo(StaticNode);
