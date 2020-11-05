import React, { memo, useCallback, useMemo } from "react";
import "./Forward.less";

import { Form, Select } from "antd";
import { StaticNodeModel } from "widgets/CustomNode";
import useSharedState from "hooks/useSharedState";
import botStore from "store/botStore";

interface Props {
  node: StaticNodeModel;
}
const Forward: React.FC<Props> = ({ node }) => {
  const [form] = Form.useForm();
  const [bot] = useSharedState(botStore);

  const initialValues = useMemo(
    () => ({
      value: Object.keys(node.value).length > 0 ? node.value : { target: null },
    }),
    [node]
  );

  const handleChanges = useCallback((_, { value }) => (node.value = value), [
    node,
  ]);

  return (
    <Form
      style={{
        maxHeight: "70vh",
        overflowY: "auto",
        overflowX: "hidden",
        padding: "0px 16px",
      }}
      form={form}
      initialValues={initialValues}
      onValuesChange={handleChanges}
    >
      <Form.Item name={["value", "target"]}>
        <Select placeholder="Fluxo de destino">
          {bot?.flows?.map(({ id, name }) => (
            <Select.Option value={id}>{name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default memo(Forward);
