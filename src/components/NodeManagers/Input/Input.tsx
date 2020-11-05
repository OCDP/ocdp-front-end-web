import React, { memo, useCallback, useMemo, useState } from "react";
import "./Input.less";

import { Col, Form, Input as AntInput, Row, Select } from "antd";
import { StaticNodeModel } from "widgets/CustomNode";
import defaultCustomTypes from "utils/defaultCustomTypes";
import useMountEffect from "hooks/lifecycle/useMountEffect";
import newMessage from "utils/newMessage";
import FieldSetMessage from "components/FieldSetMessage";

interface Props {
  node: StaticNodeModel;
  advanced?: boolean;
}

const Input: React.FC<Props> = ({ node, advanced }) => {
  const [form] = Form.useForm();
  const [inputType, setInputType] = useState("");
  const [fileType, setFileType] = useState("");

  useMountEffect(() => {
    setInputType(node.value.inputType || "");
    setFileType(node.value.fileType || "");
  });

  const initialValues = useMemo(
    () => ({
      value: {
        messages: node.value.messages || [newMessage],
        mask: node.value.mask || "",
        varName: node.value.varName || "",
        keyboardType: node.value.keyboardType || "text",
        inputType: node.value.inputType || "text",
        fileType:
          node.value.inputType === "file" ? node.value.fileType : undefined,
        customScope:
          node.value.fileType === "custom"
            ? node.value.customScope || [""]
            : undefined,
      },
    }),
    [node]
  );

  const handleChanges = useCallback(
    (_, { value }) => {
      node.value = value;
      setInputType(value.inputType);
      setFileType(value.fileType);
    },
    [node]
  );

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onValuesChange={handleChanges}
      onFocus={() => node.setLocked(true)}
      onBlur={() => node.setLocked(false)}
      layout="vertical"
      style={{ marginRight: advanced ? 32 : "unset" }}
    >
      <Form.List name={["value", "messages"]}>
        {(fields, actions) =>
          fields.map((field) => (
            <FieldSetMessage {...{ fields, actions, node, advanced, field }} />
          ))
        }
      </Form.List>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Nome da variável" name={["value", "varName"]}>
            <AntInput placeholder="Editar nome" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Tipo da variável" name={["value", "inputType"]}>
            <Select placeholder="Escolhar tipo">
              <Select.Option value="text">Texto</Select.Option>
              <Select.Option value="email">E-mail</Select.Option>
              <Select.Option value="number">Número</Select.Option>
              <Select.Option value="date">Data</Select.Option>
              <Select.Option value="file">Arquivo</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        {inputType === "file" ? (
          <>
            <Col span={fileType === "custom" ? 12 : 24}>
              <Form.Item label="Tipo de arquivo" name={["value", "fileType"]}>
                <Select placeholder="Escolhar tipo">
                  <Select.Option value="custom">Personalizado</Select.Option>
                  <Select.Option value="image">Imagem</Select.Option>
                  <Select.Option value="pdf">PDF</Select.Option>
                  <Select.Option value="any">Outros</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            {fileType === "custom" && (
              <Col span={12}>
                <Form.Item
                  label="Formatos aceitos"
                  rules={[
                    {
                      pattern: /^(([a-z1-9]{1,4})([\s,;]|$))+/,
                      message: "Tipo inválido",
                    },
                  ]}
                  name={["value", "customScope"]}
                >
                  <Select
                    placeholder="Escolher formatos"
                    mode="tags"
                    tokenSeparators={[",", ";", " "]}
                    filterOption={(input, option: any) =>
                      (option.children || "")
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {defaultCustomTypes.map((type) => (
                      <Select.Option key={type} value={type}>
                        {type}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            )}
          </>
        ) : (
          <>
            <Col span={12}>
              <Form.Item
                label="Máscara"
                name={["value", "mask"]}
                rules={[
                  {
                    pattern: /^(([ ()/.#-]))+$/,
                    message: "Máscara inválida!",
                  },
                ]}
              >
                <AntInput placeholder="Editar" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tipo do teclado"
                name={["value", "keyboardType"]}
              >
                <Select placeholder="Escolher tipo">
                  <Select.Option value="date">Data</Select.Option>
                  <Select.Option value="number">Número</Select.Option>
                  <Select.Option value="email">E-mail</Select.Option>
                  <Select.Option value="text">Texto</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </>
        )}
      </Row>
    </Form>
  );
};

export default memo(Input);
