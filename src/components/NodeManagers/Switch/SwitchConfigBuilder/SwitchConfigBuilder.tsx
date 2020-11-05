import React, { memo, useCallback, useMemo, useState } from "react";
import "./SwitchConfigBuilder.less";

import { Col, Form, Input, InputNumber, Popover, Radio, Row } from "antd";
import { FormInstance } from "antd/lib/form";
import { Buttons, Cards, ImageCards, AvatarCards } from "icons";
import useMountEffect from "hooks/lifecycle/useMountEffect";
import requiredFieldRule from "utils/requiredFieldRule";

interface Props {
  form: FormInstance;
  onFinish: (data: any) => void;
  initialValues: any;
  layout?: string;
  portName: string;
}

const SwitchConfigBuilder: React.FC<Props> = ({
  form,
  onFinish,
  initialValues,
}) => {
  const [isMulti, setIsMulti] = useState<boolean>(false);
  const [renderType, setRenderType] = useState("");
  const [mode, setMode] = useState("");

  const isAutocomplete = useMemo(() => renderType === "search", [renderType]);
  const isDynamic = useMemo(() => mode === "dynamic", [mode]);

  useMountEffect(() => {
    setIsMulti(initialValues.multiSelection.enabled);
    setRenderType(initialValues.renderType);
    setMode(initialValues.mode);
  });

  const defineMultiSelection = useCallback(
    (value: boolean) => {
      setIsMulti(value);
      if (value) {
        form.setFieldsValue({
          multiSelection: { enabled: true },
        });
      } else {
        form.setFieldsValue({
          multiSelection: { enabled: false },
        });
      }
    },
    [form]
  );

  const defineRenderType = useCallback(
    (renderType: string) => {
      setRenderType(renderType);
      if (renderType === "search") {
        form.setFieldsValue({
          layout: "button",
          switchType: "vertical",
        });
      }
    },
    [form]
  );

  const defineMode = useCallback(
    (mode: string) => {
      setMode(mode);
      if (mode === "dynamic") {
        form.setFieldsValue({
          layout: "button",
        });
      }
    },
    [form]
  );

  return (
    <Form
      form={form}
      onFinish={(values) => {
        onFinish({
          ...values,
          multiSelection: isMulti
            ? { ...values.multiSelection, enabled: true }
            : { enabled: false },
        });
      }}
      initialValues={initialValues}
      layout="vertical"
    >
      <p>
        <label style={{ marginBottom: 4 }}>
          Permitir seleção múltipla? <br />
        </label>
        <Radio.Group
          value={isMulti}
          buttonStyle="solid"
          onChange={({ target }) => defineMultiSelection(target.value)}
        >
          <Radio.Button value={true}>sim</Radio.Button>
          <Radio.Button value={false}>não</Radio.Button>
        </Radio.Group>
      </p>

      {isMulti && (
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Mínimo"
              name={["multiSelection", "min"]}
              rules={[
                requiredFieldRule,
                {
                  pattern: /^-?\d*(\.\d*)?$/,
                  message: "Digite um número!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} placeholder="Mínimo" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Máximo"
              name={["multiSelection", "max"]}
              rules={[
                {
                  pattern: /^-?\d*(\.\d*)?$/,
                  message: "Digite um número!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} placeholder="Mínimo" />
            </Form.Item>
          </Col>
        </Row>
      )}

      <Form.Item label="Tipo de interação" name={["renderType"]}>
        <Radio.Group
          buttonStyle="solid"
          onChange={({ target }) => defineRenderType(target.value)}
        >
          <Radio.Button value="list">Lista</Radio.Button>
          <Radio.Button value="search">Autocomplete</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Origem da lista" name={["mode"]}>
        <Radio.Group
          buttonStyle="solid"
          onChange={({ target }) => defineMode(target.value)}
        >
          <Popover
            placement="bottom"
            content={
              <>
                Lista estática <br />
                <small>
                  Construída a partir das opções presentes no <br /> componente
                  de seleção.
                </small>
              </>
            }
          >
            <Radio.Button value="static">Estática</Radio.Button>
          </Popover>
          <Popover
            placement="bottom"
            content={
              <>
                Lista dinâmica <br />
                <small>
                  Construída a partir de uma variável de entrada <br />
                  (do tipo Array).
                </small>
              </>
            }
          >
            <Radio.Button value="dynamic">Dinâmica</Radio.Button>
          </Popover>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label={
          <div>
            Layout da lista
            <br />
            <small>
              {isAutocomplete &&
                "Obs: só é possível utilizar layout vertical no modo autocomplete"}
            </small>
          </div>
        }
        name={["switchType"]}
      >
        <Radio.Group disabled={isAutocomplete} buttonStyle="solid">
          <Radio.Button value="horizontal">Horizontal</Radio.Button>
          <Radio.Button value="vertical">Vertical</Radio.Button>
          <Radio.Button value="slide">Slide</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label={
          <div>
            Layout das opções
            <br />
            <small>
              {(isDynamic || isAutocomplete) &&
                "Obs: só é possível utilizar botões em listas dinâmicas e autocompletes"}
            </small>
          </div>
        }
        name={["layout"]}
      >
        <Radio.Group
          disabled={isDynamic || isAutocomplete}
          buttonStyle="solid"
          className="group-icons-option"
        >
          <Popover
            placement="bottom"
            content={
              <>
                Botões <br />
                <small>Apenas o título é obrigatório.</small>
              </>
            }
          >
            <Radio.Button value="button">
              <Buttons size={90} />
            </Radio.Button>
          </Popover>
          <Popover
            placement="bottom"
            content={
              <>
                Cards <br />
                <small>Título e subtítulo obrigatórios.</small>
              </>
            }
          >
            <Radio.Button value="card">
              <Cards size={90} />
            </Radio.Button>
          </Popover>

          <Popover
            placement="bottom"
            content={
              <>
                Avatar card <br />
                <small>
                  Título, subtítulo e imagem são obrigatórios <br />
                  (imagem posicionada à esquerda).
                </small>
              </>
            }
          >
            <Radio.Button value="avatar_card">
              <AvatarCards size={90} />
            </Radio.Button>
          </Popover>

          <Popover
            placement="bottom"
            content={
              <>
                Image card <br />
                <small>
                  Título, subtítulo e imagem são obrigatórios <br />
                  (imagem posicionada no topo).
                </small>
              </>
            }
          >
            <Radio.Button value="image_card">
              <ImageCards size={90} />
            </Radio.Button>
          </Popover>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        rules={isDynamic ? [requiredFieldRule] : undefined}
        label="Variável de retorno"
        name={["outputVar"]}
      >
        <Input placeholder="Digite o nome da variável" />
      </Form.Item>
      {isDynamic && (
        <>
          <Form.Item
            rules={[requiredFieldRule]}
            label="Variável de entrada (do tipo Array)"
            name={["inputVar"]}
          >
            <Input placeholder="Digite o nome da variável" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                rules={[requiredFieldRule]}
                label="Propriedade da label"
                name={["keyProp"]}
              >
                <Input placeholder="Digite o nome da propriedade" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                rules={[requiredFieldRule]}
                label="Propriedade do valor"
                name={["valueProp"]}
              >
                <Input placeholder="Digite o nome da propriedade" />
              </Form.Item>
            </Col>
          </Row>
        </>
      )}
    </Form>
  );
};

export default memo(SwitchConfigBuilder);
