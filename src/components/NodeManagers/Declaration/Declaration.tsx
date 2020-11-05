import React, { memo, useCallback, useMemo } from "react";
import "./Declaration.less";

import {
  DeleteOutlined,
  PlusOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { StaticNodeModel } from "widgets/CustomNode";
import requiredFieldmRule from "utils/requiredFieldRule";

interface Props {
  node: StaticNodeModel;
}

const Declaration: React.FC<Props> = ({ node }) => {
  const [form] = Form.useForm();

  const handleChanges = useCallback((_, { value }) => (node.value = value), [
    node,
  ]);

  const initialValues = useMemo(() => ({ value: Object.keys(node.value).length > 0 ? node.value : [{}] }), [node]);

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onValuesChange={handleChanges}
      onFocus={() => node.setLocked(true)}
      onBlur={() => node.setLocked(false)}
    >
      <Form.List name={["value"]}>
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map(({ fieldKey, key, name }, i) => (
                <div
                  className="item-list-declaration"
                  key={`${key}-${i}-message`}
                >
                  <div className="item-list-options">
                    <Form.Item
                      rules={[
                        requiredFieldmRule,
                        {
                          pattern: /^(([a-zA-z])||([0-9]))+$/,
                          message: "Variável inválida!",
                        },
                      ]}
                      fieldKey={fieldKey}
                      name={[name, "name"]}
                    >
                      <Input placeholder="Nome da variável" />
                    </Form.Item>
                    <Form.Item
                      fieldKey={fieldKey}
                      name={[name, "initialValue"]}
                    >
                      <Input placeholder="Valor da variável" />
                    </Form.Item>
                  </div>
                  <div>
                    <Button
                      type="text"
                      icon={
                        fields.length > 1 ? (
                          <DeleteOutlined />
                        ) : (
                          <MessageOutlined />
                        )
                      }
                      onClick={
                        fields.length > 1
                          ? () => {
                              remove(i);
                              node.setLocked(false);
                            }
                          : undefined
                      }
                    />
                  </div>
                </div>
              ))}
              <Button
                type="link"
                className="btn-add-message"
                onClick={() => {
                  add("");
                  node.setLocked(false);
                }}
              >
                <PlusOutlined /> Adicionar variável
              </Button>
            </>
          );
        }}
      </Form.List>
    </Form>
  );
};

export default memo(Declaration);
