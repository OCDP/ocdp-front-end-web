import React, { useState } from "react";
import "./FormLogEx.less";

import { Button, Divider, Form, Input, Radio, Space } from "antd";
import requiredFieldRule from "utils/requiredFieldRule";
import { logicOperators } from "utils/labels/operators";
import FieldSetLogEx from "components/FieldSetLogEx";

const newExpression: Models.LogEx = {
  operator: "==",
};
const newConjunction: Models.LogEx = {
  operator: "and",
};

type Props = Utils.CustomFormProps<any> & { portName: string };
const FormLogEx: React.FC<Props> = ({
  form,
  onFinish,
  initialValues,
  portName,
}) => {
  const [liveChanges, setLiveChanges] = useState(initialValues);

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      initialValues={initialValues}
      onValuesChange={(_, values) => setLiveChanges(values)}
    >
      <Form.Item label="Apelido do caso" name={[portName, "title"]}>
        <Input />
      </Form.Item>
      <Divider orientation="left">Condições</Divider>
      <Form.List name={[portName, "logEx"]}>
        {(fields, { add, remove }) => (
          <Space direction="vertical">
            {fields.map(({ fieldKey, key, name }) => (
              <React.Fragment key={key}>
                {name % 2 === 0 ? (
                  <FieldSetLogEx
                    key={key}
                    fieldKey={fieldKey}
                    name={name}
                    operator={liveChanges[portName].logEx[name]}
                    onRemove={() => {
                      if (name === 0) remove([name, name + 1]);
                      else remove([name - 1, name]);
                    }}
                  />
                ) : (
                  <Form.Item
                    name={[name, "operator"]}
                    fieldKey={fieldKey}
                    rules={[requiredFieldRule]}
                    style={{ margin: 0, marginBottom: 16 }}
                  >
                    <Radio.Group buttonStyle="solid">
                      {Object.entries(logicOperators).map(
                        ([operator, label]) => (
                          <Radio.Button key={operator} value={operator}>
                            {label}
                          </Radio.Button>
                        )
                      )}
                    </Radio.Group>
                  </Form.Item>
                )}
              </React.Fragment>
            ))}
            <Button
              type="dashed"
              onClick={() => {
                if (fields.length > 0) add(newConjunction);
                add(newExpression);
              }}
              style={{ margin: 0, marginBottom: 16 }}
            >
              Adicionar expressão
            </Button>
          </Space>
        )}
      </Form.List>
    </Form>
  );
};

export default FormLogEx;
