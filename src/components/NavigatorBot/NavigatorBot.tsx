import React, { memo, useCallback } from "react";
import "./NavigatorBot.less";

import { Button, Divider, Form, Input, Menu, Popover, Typography } from "antd";
import { useGetBot } from "hooks/networking/bots";
import useMountEffect from "hooks/lifecycle/useMountEffect";
import handleApiError from "utils/feedback/handleApiError";
import Avatar from "antd/lib/avatar/avatar";
import useSharedState from "hooks/useSharedState";
import botStore from "store/botStore";
import { PlusOutlined, SaveOutlined, ClusterOutlined } from "@ant-design/icons";
import { usePostFlow } from "hooks/networking/flows";
import requiredFieldRule from "utils/requiredFieldRule";
import { useHistory, useParams } from "react-router-dom";
import { botDefault } from "utils/constants";
import editorStore from "store/editorStore";
import flowStore from "store/flowStore";

interface Props {}
const NavigatorBot: React.FC<Props> = () => {
  const { id_bot } = useParams() as Dict<string>;
  const history = useHistory();

  const [selectedBot, setSelectedBot] = useSharedState(botStore);
  const [selectedFlow] = useSharedState(flowStore);
  const [{ collapsed }] = useSharedState(editorStore);
  const [formFlow] = Form.useForm();

  const getBot = useGetBot();

  const _getBot = useCallback(
    async (id: string) => {
      try {
        const { data } = await getBot(id);
        setSelectedBot(data);
      } catch (err) {
        handleApiError({
          error: err.data,
          content: "Ocorreu um erro ao detalhar esse bot.",
        });
      }
    },
    [getBot, setSelectedBot]
  );

  const navigate = useCallback(
    (id_flow: string) => () =>
      history.push(`/p/bots/${id_bot}/editor/${id_flow}`),
    [history, id_bot]
  );

  const dataMock = [
    { id: "1", name: "marcelo", description: "lorem etc etc etc" },
    { id: "2", name: "marcelo", description: "lorem etc etc etc" },
    { id: "3", name: "marcelo", description: "lorem etc etc etc" },
    { id: "4", name: "marcelo", description: "lorem etc etc etc" },
    { id: "5", name: "marcelo", description: "lorem etc etc etc" },
    { id: "6", name: "marcelo", description: "lorem etc etc etc" },
  ];

  useMountEffect(() => {
    _getBot(id_bot);
  });

  return (
    <>
      <div
        style={{
          padding: "16px 8px",
          width: "100%",
          background: "var(--background-color)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Popover placement="right" content={selectedBot?.name}>
            <Avatar size={collapsed ? 32 : 64} src={botDefault} />
          </Popover>

          {!collapsed && (
            <div style={{ marginTop: 16 }}>
              <b>um titulo legal</b>
              <>
                <Divider />
                <div>
                  <small>
                    <Typography.Paragraph
                      ellipsis={{ expandable: true, rows: 2 }}
                    >
                      descricao maneira
                    </Typography.Paragraph>
                  </small>
                </div>
              </>
            </div>
          )}
        </div>
      </div>

      <Menu theme="dark" mode="inline" selectedKeys={[selectedFlow?.id || ""]}>
        {id_bot && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 8,
            }}
          >
            <Popover
              trigger="click"
              placement="rightTop"
              title="Cadastrar fluxo"
              content={
                <Form
                  style={{ marginTop: 24, width: 300 }}
                  form={formFlow}
                  onFinish={() => {}}
                  layout="vertical"
                >
                  <Form.Item rules={[requiredFieldRule]} name="name">
                    <Input placeholder="Nome do novo item" />
                  </Form.Item>
                  <Form.Item name="description">
                    <Input placeholder="Descrição do novo item" />
                  </Form.Item>
                  <Button
                    icon={<SaveOutlined />}
                    type="link"
                    onClick={formFlow.submit}
                  >
                    cadastrar
                  </Button>
                </Form>
              }
            >
              <Button type="link" icon={<PlusOutlined />}>
                {collapsed ? "" : "adicionar item"}
              </Button>
            </Popover>
          </div>
        )}

        {dataMock.map(({ id, name, description }) => (
          <Menu.Item
            key={id}
            title={
              <div>
                <b>{name}</b> <br /> <small>{description}</small>
              </div>
            }
            onClick={navigate(id)}
            icon={<ClusterOutlined />}
          >
            {name}
          </Menu.Item>
        ))}
      </Menu>
    </>
  );
};

export default memo(NavigatorBot);
