import React, { memo, useMemo, useState } from "react";
import "./SwitchItemBuilder.less";

import { Form, Input } from "antd";
import UploadImage from "components/UploadImage";
import requiredFieldRule from "utils/requiredFieldRule";

const subtitleConds = ["card", "avatar_card", "image_card"];
const imageConds = ["avatar_card", "image_card"];

type Props = Utils.CustomFormProps<any> & {
  portName: string;
  isDynamic: boolean;
};
const SwitchItemBuilder: React.FC<Props> = ({
  form,
  onFinish,
  initialValues: rawValues,
  portName,
  isDynamic,
}) => {
  const initialValues = useMemo(() => (rawValues ? rawValues : {}), [
    rawValues,
  ]);
  const [url, setUrl] = useState("");

  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={initialValues}
      layout="vertical"
    >
      {!isDynamic && (
        <Form.Item
          rules={
            imageConds.includes(initialValues.layout)
              ? [requiredFieldRule]
              : undefined
          }
          label="Imagem"
          name={["options", portName, "image"]}
        >
          <UploadImage onChange={setUrl} value={url} />
        </Form.Item>
      )}

      <Form.Item
        rules={[requiredFieldRule]}
        label="Título"
        name={["options", portName, "title"]}
      >
        <Input placeholder="Digite o título" />
      </Form.Item>
      {!isDynamic && (
        <Form.Item
          rules={
            subtitleConds.includes(initialValues.layout)
              ? [requiredFieldRule]
              : undefined
          }
          label="Subtítulo"
          name={["options", portName, "subtitle"]}
        >
          <Input placeholder="Digite o subtítulo" />
        </Form.Item>
      )}

      <Form.Item
        rules={isDynamic ? [requiredFieldRule] : undefined}
        label="Valor"
        name={["options", portName, "value"]}
      >
        <Input placeholder="Digite o valor" />
      </Form.Item>
    </Form>
  );
};

export default memo(SwitchItemBuilder);
