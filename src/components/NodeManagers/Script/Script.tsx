import React, { memo, useCallback, useContext, useMemo } from "react";
import "./Script.less";

import { Button, Form, Input } from "antd";
import MonacoEditor from "react-monaco-editor";
import { SettingOutlined } from "@ant-design/icons";
import { DiagramEngine } from "@projectstorm/react-diagrams";
import { StaticNodeModel } from "widgets/CustomNode";
import AppContext from "contexts/AppContext";

const useGuidelines = `/**
 * Componente de Script
 *
 * Utilize o editor para escrever scripts que serão executados pelo fluxo em que 
 * estão inseridos.
 *
 * Há 2 utilitários disponíveis para uso interno deste editor. São eles:
 *
 * 1. "variables": Objeto contendo as variáveis globais da sessão.
 *   - Exemplos de uso:
 *       const { username } = variables;
 *       const authToken = variables.authToken;
 *       variables["cpfValidado"] = cpfValidado;
 * 
 * 2. "addText": Função usada para escrever uma mensagem no chat.
 *   - Exemplos de uso:
 *       addText("Olá, mundo");
 *       addText\`Seu nome de usuário é: \${username}\`;
 */


`;

const libSource = [
  "declare type RuntimeVariables = { [key: string]: string | undefined }",
  "",
  "/**",
  " * Objeto contendo as variáveis globais da sessão.",
  " * ",
  " * Exemplos de uso:",
  " * ```javascript",
  " * const { username } = variables;",
  " * const authToken = variables.authToken;",
  ' * variables["cpfValidado"] = cpfValidado;',
  " * ```",
  " */",
  "",
  "declare const variables: RuntimeVariables;",
  "",
  "/**",
  " * Função usada para escrever uma mensagem no chat.",
  " * ",
  " * Exemplo de uso:",
  " * ```javascript",
  ' * addText("Olá, mundo");',
  // eslint-disable-next-line no-template-curly-in-string
  " * addText`Seu nome de usuário é: ${username}`;",
  " * ```",
  " */",
  "",
  "declare function addText(content: string): void;",
].join("\n");
const libUri = "ts:filename/facts.d.ts";

interface Props {
  node: StaticNodeModel;
  engine: DiagramEngine;
}
const Script: React.FC<Props> = ({ node, engine }) => {
  const [form] = Form.useForm();
  const { openDrawer, closeDrawer } = useContext(AppContext);

  const initialValues = useMemo(
    () => ({ value: Object.keys(node.value).length > 0 ? node.value : {} }),
    [node]
  );

  const handleChanges = useCallback((_, { value }) => (node.value = value), [
    node,
  ]);

  return (
    <>
      <Button
        onClick={() => {
          node.setSelected(false);
          engine.getModel().setLocked(true);
          openDrawer({
            title: "Editar script",
            size: "lg",
            content: (
              <Form
                form={form}
                initialValues={initialValues}
                onValuesChange={handleChanges}
              >
                <Form.Item name={["value", "mainLabel"]}>
                  <Input placeholder="Digite aqui o titulo do script..." />
                </Form.Item>
                <Form.Item name={["value", "content"]}>
                  <MonacoEditor
                    height="78vh"
                    width="100%"
                    options={{ rulers: [80], tabSize: 2 }}
                    editorWillMount={({ languages }) => {
                      languages.typescript.javascriptDefaults.setDiagnosticsOptions(
                        {
                          noSemanticValidation: true,
                          noSyntaxValidation: false,
                        }
                      );

                      languages.typescript.javascriptDefaults.setCompilerOptions(
                        {
                          target: languages.typescript.ScriptTarget.ES2018,
                          allowNonTsExtensions: true,
                        }
                      );

                      languages.typescript.javascriptDefaults.addExtraLib(
                        libSource,
                        libUri
                      );
                    }}
                    language="javascript"
                    theme="vs-dark"
                    defaultValue={useGuidelines}
                  />
                </Form.Item>
              </Form>
            ),
            onOk: () => {
              node.setSelected(true);
              closeDrawer();
              engine.getModel().setLocked(false);
            },
            onCancel: () => {
              node.setSelected(true);
              engine.getModel().setLocked(false);
            },
          });
        }}
        icon={<SettingOutlined style={{ fontSize: 18 }} />}
        type="text"
        title="Editar script"
      />
    </>
  );
};

export default memo(Script);
