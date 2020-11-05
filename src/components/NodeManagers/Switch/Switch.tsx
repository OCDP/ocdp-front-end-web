import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import "./Switch.less";

import { DiagramEngine } from "@projectstorm/react-diagrams";
import { DynamicNodeModel } from "widgets/CustomNode";
import { Button, Form } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import CustomPort, { CustomPortModel } from "widgets/CustomPort";
import { Subject } from "rxjs";
import UUID from "utils/UUID";
import useMountEffect from "hooks/lifecycle/useMountEffect";
import getCorner from "utils/getCorner";
import AppContext from "contexts/AppContext";
import SwitchItemBuilder from "./SwitchItemBuilder";
interface Props {
  node: DynamicNodeModel;
  engine: DiagramEngine;
}
const Switch: React.FC<Props> = ({ node, engine }) => {
  const [form] = Form.useForm();
  const { openDrawer, closeDrawer } = useContext(AppContext);

  const [outPorts, setOutports] = useState<Record<string, CustomPortModel>>({});
  const [reportSubject] = useState(() => new Subject<void>());
  const [reportObservable] = useState(() => reportSubject.asObservable());

  const portEntries = useMemo(() => Object.entries(outPorts), [outPorts]);

  useEffect(() => {
    const subscription = node.getOutPortsObservable().subscribe(
      (outPorts) => {
        setOutports(outPorts);
        reportSubject.next();
        engine.repaintCanvas();
      },
      (err) => console.error("<Switch />", err)
    );
    return () => subscription.unsubscribe();
  }, [engine, node, outPorts, reportSubject]);

  const addPort = useCallback(
    () => node.addPort(new CustomPortModel(`out-${UUID.v4()}`)),
    [node]
  );

  const removePort = useCallback(
    (outPort: CustomPortModel) => () => {
      Object.values(outPort.getLinks()).forEach((link) => {
        link.remove();
      });
      node.removePort(outPort);
      delete node.value.options[outPort.getName()];
    },
    [node]
  );

  const editOption = useCallback(
    (portName: string) => {
      node.setSelected(false);
      openDrawer({
        title: `${node?.value?.options[portName]?.title || "Editar opção"}`,
        size: "lg",
        content: (
          <SwitchItemBuilder
            isDynamic={node?.value.mode === "dynamic"}
            portName={portName}
            form={form}
            onFinish={(data) => {
              closeDrawer();
              node.value.options[portName] = data.options[portName];
            }}
            initialValues={node.value}
          />
        ),
        onOk: form.submit,
        onCancel: form.resetFields,
      });
    },
    [closeDrawer, form, node, openDrawer]
  );

  useMountEffect(() => {
    if (!node.getPort("out")) {
      node.addPort(new CustomPortModel("out"));
      const options: Dict<any> = {};
      const newPort = addPort();
      options[newPort.getName()] = {};
      node.value = { ...node.value, options };
    }
  });

  return (
    <div className="switch-content-wrapper">
      <div className="switch-list">
        {portEntries.map(([portName, outPort], index) => (
          <div key={portName} className="switch-item">
            <Button onClick={() => editOption(portName)}>
              {node?.value?.options[portName]?.title || "Editar opção"}
            </Button>
            <Button
              type="text"
              icon={<DeleteOutlined />}
              disabled={
                portEntries.length === 1 && node?.value.mode === "static"
              }
              onClick={removePort(outPort)}
            />
            <CustomPort
              engine={engine}
              port={outPort}
              reportObservable={reportObservable}
              className={`switch-port out ${
                node.value.mode === "dynamic" ||
                node.value.multiSelection.enabled
                  ? "switch-port-dynamic"
                  : ""
              }`}
              style={getCorner("right", -2.35)}
            />
          </div>
        ))}
      </div>
      <Button
        className="add-switch"
        size="large"
        type="text"
        icon={<PlusOutlined />}
        onClick={addPort}
      >
        Adicionar opção
      </Button>
      {node.getPort("out") ? (
        <div className="switch-item-default">
          <Button type="text" disabled>
            Resposta Padrão
          </Button>
          <CustomPort
            engine={engine}
            port={node.getPort("out")}
            reportObservable={reportObservable}
            className="switch-port out default"
            style={getCorner("right", -2.35)}
          />
        </div>
      ) : (
        <div className="switch-item-default">
          <Button type="text" disabled loading>
            Resposta Padrão
          </Button>
        </div>
      )}
    </div>
  );
};

export default memo(Switch);
