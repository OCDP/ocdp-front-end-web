import React, { memo, useCallback, useContext, useState } from "react";
import "widgets/CustomNode/CustomNode.less";

import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import DynamicNodeModel from "./DynamicNode.model";
import getCorner from "utils/getCorner";
import CustomPort from "widgets/CustomPort";
import { Conditional } from "components/NodeManagers";
import { Switch } from "components/NodeManagers";
import useMountEffect from "hooks/lifecycle/useMountEffect";
import useUnmountEffect from "hooks/lifecycle/useUnmountEffect";
import { flowIcons, nodeHasOutPort } from "configs/flowConfig";
import { SettingOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import AppContext from "contexts/AppContext";
import SwitchConfigBuilder from "components/NodeManagers/Switch/SwitchConfigBuilder";

const Separator: React.FC = ({ children }) => (
  <>
    <div style={{ flex: 1 }} />
    {children}
  </>
);

interface Props {
  node: DynamicNodeModel;
  engine: DiagramEngine;
}

const distance = -1.4;

const DynamicNode: React.FC<Props> = ({ node, engine }) => {
  const [selected, setSelected] = useState(false);
  const { openDrawer, closeDrawer } = useContext(AppContext);
  const [formConfig] = Form.useForm();

  useMountEffect(() => {
    node?.registerListener({
      selectionChanged: ({ isSelected = false }: any) => {
        setSelected(isSelected);
      },
    });
    if (node.nodeType === "switch" && !node.value.mode) {
      node.value = {
        options: { ...node.value.options },
        switchType: "horizontal",
        layout: "button",
        mode: "static",
        multiSelection: { enabled: false },
        renderType: "list",
      };
    }
  });

  useUnmountEffect(() => node?.clearListeners());

  const openAdvancedSwitchSettings = useCallback(() => {
    node.setSelected(false);
    openDrawer({
      title: "Configurações",
      size: "md",
      content: (
        <SwitchConfigBuilder
          initialValues={node.value}
          portName={"portName"}
          layout={""}
          form={formConfig}
          onFinish={(data) => {
            node.value = { ...node.value, ...data };
            if (node.value.mode === "dynamic" || node.value.multiSelection) {
              Object.values(node.getPorts()).forEach((port) => {
                if (!["in", "out"].includes(port.getName())) {
                  Object.values(port.getLinks()).forEach((link) => {
                    link.remove();
                  });
                }
              });
            }
            setTimeout(() => engine.repaintCanvas());
            closeDrawer();
          }}
        />
      ),
      onOk: formConfig.submit,
      onCancel: () => {},
    });
  }, [closeDrawer, engine, formConfig, node, openDrawer]);

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
          {node.label}
          {node.nodeType === "switch" && (
            <Separator>
              <Button
                onClick={openAdvancedSwitchSettings}
                icon={<SettingOutlined />}
                type="text"
              />
            </Separator>
          )}
        </div>
        <div className="custom-node-body">
          {node.nodeType === "conditional" && (
            <Conditional node={node} engine={engine} />
          )}
          {node.nodeType === "switch" && <Switch node={node} engine={engine} />}
        </div>
      </div>

      {nodeHasOutPort[node.nodeType] && node.getPort("out") && (
        <CustomPort
          engine={engine}
          port={node.getPort("out")}
          className="out"
          style={getCorner("right", distance)}
        />
      )}
    </div>
  );
};

export default memo(DynamicNode);
