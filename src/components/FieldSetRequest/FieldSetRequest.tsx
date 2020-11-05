import React, { memo, useCallback } from "react";
import "./FieldSetRequest.less";

import { Button, Col, Form, Input, Row } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { FormListFieldData } from "antd/lib/form/FormList";
import requiredFieldmRule from "utils/requiredFieldRule";

type Props = FormListFieldData & {
  onRemove: (index: number | number[]) => void;
};
const FieldSetRequest: React.FC<Props> = ({
  fieldKey,
  key,
  name,
  onRemove,
}) => {
  const removeItem = useCallback(() => {
    onRemove(name);
  }, [name, onRemove]);

  return (
    <div className="item-list-request" key={`${key}-request`}>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            rules={[requiredFieldmRule]}
            fieldKey={fieldKey}
            name={[name, "key"]}
          >
            <Input placeholder="Chave" />
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item
            rules={[requiredFieldmRule]}
            fieldKey={fieldKey}
            name={[name, "value"]}
          >
            <Input
              addonAfter={
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={removeItem}
                />
              }
              placeholder="Valor"
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default memo(FieldSetRequest);
