import React, { memo, useCallback, useState } from "react";
import "./FieldSetLogEx.less";

import { Button, Checkbox, Form, Input, Select, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { FormListFieldData } from "antd/lib/form/FormList";
import requiredFieldRule from "utils/requiredFieldRule";
import operators, {
  logicOperators,
  unaryOperators,
} from "utils/labels/operators";

type Props = FormListFieldData &
  Pick<Models.LogEx, "operator"> & {
    onRemove: (index: number | number[]) => void;
  };
const FieldSetLogEx: React.FC<Props> = ({
  operator: initialOperator,
  fieldKey,
  name,
  onRemove,
}) => {
  const [operator, setOperator] = useState(initialOperator);

  const removeItem = useCallback(() => {
    onRemove(name);
  }, [name, onRemove]);

  return (
    <Space align="start">
      {!logicOperators[operator as Models.LogEx.LogicOperator] && (
        <Form.Item
          name={[name, "negation"]}
          fieldKey={fieldKey}
          valuePropName="checked"
        >
          <Checkbox>Negação</Checkbox>
        </Form.Item>
      )}
      <Form.Item
        name={[name, "left"]}
        fieldKey={fieldKey}
        rules={[requiredFieldRule]}
        style={{ minWidth: "100px" }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={[name, "operator"]}
        fieldKey={fieldKey}
        rules={[requiredFieldRule]}
        style={{ minWidth: 200 }}
      >
        <Select
          showSearch
          filterOption={(input, option: any) =>
            (option.children || "")
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          }
          onChange={(value) => setOperator(value as Models.LogEx.Operator)}
        >
          {Object.entries(operators).map(([operator, label]) => (
            <Select.Option key={operator} value={operator}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      {!unaryOperators[operator as Models.LogEx.UnaryOperator] && (
        <Form.Item
          name={[name, "right"]}
          fieldKey={fieldKey}
          rules={[requiredFieldRule]}
          style={{ minWidth: "100px" }}
        >
          <Input />
        </Form.Item>
      )}
      <Button
        type="primary"
        danger
        icon={<DeleteOutlined />}
        onClick={removeItem}
      />
    </Space>
  );
};

export default memo(FieldSetLogEx);
