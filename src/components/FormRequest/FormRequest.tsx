import React, { memo, useState } from "react";
import "./FormRequest.less";

import FieldSetRequest from "components/FieldSetRequest";
import {
  Col,
  Row,
  Form,
  Input,
  Divider,
  Button,
  Radio,
  Select,
  Popover,
} from "antd";
import requiredFieldmRule from "utils/requiredFieldRule";
import { PlusOutlined } from "@ant-design/icons";

type Props = Utils.CustomFormProps<any>;
const FormRequest: React.FC<Props> = ({ form, initialValues, onFinish }) => {
  const [isAsync, setIsAsync] = useState(
    () => initialValues.value.async || false
  );

  return (
    <Form
      style={{ marginRight: 32 }}
      layout="vertical"
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      onValuesChange={(_, { value }) => {
        if (Object.keys(value).includes("async")) {
          setIsAsync(value.async);
          if (value.async) {
            form.setFieldsValue({
              value: {
                outputVar: undefined,
              },
            });
          }
        }
      }}
    >
      <Form.Item name={["value", "mainLabel"]}>
        <Input placeholder="Título da requisição" />
      </Form.Item>

      <Form.Item label="Tipo de requisição" name={["value", "async"]}>
        <Radio.Group buttonStyle="solid">
          <Popover
            placement="bottom"
            content={
              <>
                Síncrona <br />
                <small>
                  A resposta da requisição será salva na{" "}
                  <b>
                    variável <br /> de retorno
                  </b>
                  , após a conclusão da mesma.
                </small>
              </>
            }
          >
            <Radio.Button value={false}>síncrona</Radio.Button>
          </Popover>
          <Popover
            placement="bottom"
            content={
              <>
                Assíncrona <br />
                <small>O fluxo não aguardará a resposta da requisição.</small>
              </>
            }
          >
            <Radio.Button value={true}>assíncrona</Radio.Button>
          </Popover>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name={["value", "outputVar"]}
        label={
          <div>
            Variável de retorno
            <br />
            {isAsync && (
              <small>
                Obs.: <b>desabilitada</b>, pois requisições asssíncronas não
                capturam o retorno.
              </small>
            )}
          </div>
        }
        rules={
          isAsync
            ? []
            : [
                requiredFieldmRule,
                {
                  pattern: /^(([a-zA-z])||([0-9]))+$/,
                  message: "Variável inválida!",
                },
              ]
        }
      >
        <Input placeholder="Variável de retorno" disabled={isAsync} />
      </Form.Item>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name={["value", "requestType"]}>
            <Select placeholder="Método">
              <Select.Option value="post">POST</Select.Option>
              <Select.Option value="get">GET</Select.Option>
              <Select.Option value="put">PUT</Select.Option>
              <Select.Option value="delete">DELETE</Select.Option>
              <Select.Option value="patch">PATCH</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item name={["value", "requestURL"]}>
            <Input placeholder="URL da reuisição" />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left">
        <small> Headers </small>
      </Divider>
      <Form.List name={["value", "headers"]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <FieldSetRequest {...field} onRemove={remove} />
            ))}
            <Button type="dashed" icon={<PlusOutlined />} onClick={add}>
              add
            </Button>
          </>
        )}
      </Form.List>

      <Divider orientation="left">
        <small> Query params </small>
      </Divider>
      <Form.List name={["value", "params"]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <FieldSetRequest {...field} onRemove={remove} />
            ))}
            <Button type="dashed" icon={<PlusOutlined />} onClick={add}>
              add
            </Button>
          </>
        )}
      </Form.List>

      <Divider orientation="left">
        <small> Body </small>
      </Divider>
      <Form.Item name={["value", "contentType"]}>
        <Radio.Group buttonStyle="solid">
          <Radio.Button value="json">JSON</Radio.Button>
          <Radio.Button value="xml">XML</Radio.Button>
          <Radio.Button value="text">Texto Plano</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item name={["value", "body"]}>
        <Input.TextArea
          placeholder="Bigite aqui o copo da requisição..."
          rows={15}
        />
      </Form.Item>
    </Form>
  );
};

export default memo(FormRequest);
