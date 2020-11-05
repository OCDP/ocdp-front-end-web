import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import "./Conditional.less";

import { DiagramEngine } from "@projectstorm/react-diagrams";
import { DynamicNodeModel } from "widgets/CustomNode";
import { Button, Form } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import CustomPort, { CustomPortModel } from "widgets/CustomPort";
import { Subject } from "rxjs";
import getCorner from "utils/getCorner";
import UUID from "utils/UUID";
import useMountEffect from "hooks/lifecycle/useMountEffect";
import FormLogEx from "components/FormLogEx";
import AppContext from "contexts/AppContext";

interface Props {
  node: DynamicNodeModel;
  engine: DiagramEngine;
}
const Conditional: React.FC<Props> = ({ node, engine }) => {
  const [outPorts, setOutports] = useState<Record<string, CustomPortModel>>({});
  const [reportSubject] = useState(() => new Subject<void>());
  const [reportObservable] = useState(() => reportSubject.asObservable());
  const { openDrawer, closeDrawer } = useContext(AppContext);
  const [form] = Form.useForm();

  const portEntries = useMemo(() => Object.entries(outPorts), [outPorts]);

  useEffect(() => {
    const subscription = node.getOutPortsObservable().subscribe(
      (outPorts) => {
        setOutports(outPorts);
        reportSubject.next();
        engine.repaintCanvas();
      },
      (err) => console.error("<Conditional />", err)
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
      delete node.value[outPort.getName()];
    },
    [node]
  );

  const editLogEx = useCallback(
    (index: number, portName: string) => () => {
      const title = `Caso ${index + 1}`;
      node.setSelected(false);
      if (!node.value[portName]) {
        node.value[portName] = { logEx: [{ operator: "==" }], title };
      }
      openDrawer({
        title,
        size: "lg",
        content: (
          <FormLogEx
            portName={portName}
            initialValues={node.value}
            form={form}
            onFinish={(value) => {
              closeDrawer();
              node.setSelected(true);
              node.value[portName] = value[portName];
              node.setSelected(false);
            }}
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
      addPort();
      node.value = {};
    }
  });

  return (
    <div className="conditional-content-wrapper">
      <div className="condition-list">
        {portEntries.map(([portName, outPort], index) => (
          <div key={portName} className="condition-item">
            <Button type="text" onClick={editLogEx(index, portName)}>
              {node.value[portName]?.title || `Caso ${index + 1}`}
            </Button>
            <Button
              type="text"
              icon={<DeleteOutlined />}
              disabled={portEntries.length === 1}
              onClick={removePort(outPort)}
            />
            <CustomPort
              engine={engine}
              port={outPort}
              reportObservable={reportObservable}
              className="condition-port out"
              style={getCorner("right", -2.35)}
            />
          </div>
        ))}
      </div>
      <Button
        className="add-condition"
        size="large"
        type="text"
        icon={<PlusOutlined />}
        onClick={addPort}
      >
        Adicionar caso
      </Button>
      {node.getPort("out") ? (
        <div className="condition-item-default">
          <Button type="text" disabled>
            Caso contrário
          </Button>
          <CustomPort
            engine={engine}
            port={node.getPort("out")}
            reportObservable={reportObservable}
            className="condition-port out default"
            style={getCorner("right", -2.35)}
          />
        </div>
      ) : (
        <div className="condition-item-default">
          <Button type="text" disabled loading>
            Caso contrário
          </Button>
        </div>
      )}
    </div>
  );
};

export default memo(Conditional);
