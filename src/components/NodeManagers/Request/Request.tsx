import React, { memo, useCallback, useContext, useMemo } from "react";
import "./Request.less";

import { Button, Form } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { DiagramEngine } from "@projectstorm/react-diagrams";
import { StaticNodeModel } from "widgets/CustomNode";
import arrayToDict, { revert as revertDict } from "utils/arrayToDict";
import AppContext from "contexts/AppContext";
import FormRequest from "components/FormRequest";

interface Props {
  node: StaticNodeModel;
  engine: DiagramEngine;
}
const Request: React.FC<Props> = ({ node, engine }) => {
  const [form] = Form.useForm();
  const { openDrawer, closeDrawer } = useContext(AppContext);

  const initialValues = useMemo(() => {
    let value = {
      ...(node.value.contentType
        ? node.value
        : {
            headers: {},
            params: {},
            contentType: "json",
            requestType: "get",
            async: false,
          }),
    };
    value.headers = revertDict(value.headers);
    value.params = revertDict(value.params);
    return { value };
  }, [node]);

  const handleChanges = useCallback(
    ({ value: rawValue }) => {
      const value = { ...rawValue };
      value.headers = arrayToDict(value.headers || []);
      value.params = arrayToDict(value.params || []);
      node.value = value;
      node.setSelected(true);
      engine.getModel().setLocked(false);
    },
    [engine, node]
  );

  return (
    <>
      <Button
        onClick={() => {
          node.setSelected(false);
          engine.getModel().setLocked(true);
          openDrawer({
            title: "Editar requisição",
            size: "lg",
            content: (
              <FormRequest
                form={form}
                initialValues={initialValues}
                onFinish={handleChanges}
              />
            ),
            overflow: ["hidden", "auto"],
            onOk: () => {
              form.submit();
              closeDrawer();
            },
            onCancel: () => {
              node.setSelected(true);
              engine.getModel().setLocked(false);
            },
          });
        }}
        icon={<SettingOutlined style={{ fontSize: 18 }} />}
        type="text"
        title="Editar requisição"
      />
    </>
  );
};

export default memo(Request);
