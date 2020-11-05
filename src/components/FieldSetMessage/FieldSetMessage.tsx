import React, { memo, useState } from "react";
import "./FieldSetMessage.less";

import { Button, Col, Form, Input, Row, Select } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { FormListFieldData } from "antd/lib/form/FormList";
import useMountEffect from "hooks/lifecycle/useMountEffect";
import { StaticNodeModel } from "widgets/CustomNode";
import UploadImage from "components/UploadImage";
import newMessage from "utils/newMessage";

interface Props {
  fields: FormListFieldData[];
  actions: {
    add: (defaultValue?: any, insertIndex?: number | undefined) => void;
    remove: (index: number | number[]) => void;
  };
  node: StaticNodeModel;
  advanced?: boolean;
  field: FormListFieldData;
}

const FieldSetMessage: React.FC<Props> = ({
  fields,
  actions,
  node,
  advanced,
  field,
}) => {
  const [messageType, setMessageType] = useState<string>();
  const [url, setUrl] = useState("");

  useMountEffect(() => {
    if (advanced) {
      setMessageType(node?.value[field.name]?.messageType || "text");
    } else {
      setMessageType("text");
    }
  });

  return (
    <div className="item-list-message">
      <Row gutter={16} className="row-itens-message">
        {advanced && (
          <Col span={7}>
            <Form.Item
              fieldKey={field.fieldKey}
              name={[field.name, "messageType"]}
            >
              <Select
                placeholder="Tipo"
                onSelect={(value) => {
                  if (node.value[field.name].value) {
                    node.value[field.name].value = undefined;
                  }
                  setTimeout(() => {
                    setMessageType(value as string);
                  });
                }}
              >
                <Select.Option value="text">Texto</Select.Option>
                <Select.Option value="html">HTML</Select.Option>
                <Select.Option value="image">Image</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        )}

        {messageType && messageType === "image" && (
          <Col span={15} style={{ display: "flex", flexDirection: "row" }}>
            <Form.Item name={[field.name, "value"]}>
              <UploadImage onChange={setUrl} value={url} />
            </Form.Item>
          </Col>
        )}

        {messageType && messageType !== "image" && (
          <Col span={advanced ? 15 : 20}>
            <Form.Item fieldKey={field.fieldKey} name={[field.name, "value"]}>
              <Input.TextArea rows={2} placeholder="Inserir mensagem" />
            </Form.Item>
          </Col>
        )}

        <Col span={advanced ? 2 : 4}>
          <Form.Item>
            <Button
              type="text"
              icon={
                fields.length === field.name + 1 ? (
                  <PlusOutlined />
                ) : (
                  <DeleteOutlined />
                )
              }
              onClick={
                fields.length === field.name + 1
                  ? () => {
                      actions.add(newMessage);
                      node.setLocked(false);
                    }
                  : () => {
                      actions.remove(field.name);
                      node.setLocked(false);
                    }
              }
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default memo(FieldSetMessage);
