import React, { useCallback, useState } from "react";
import "./BotsPage.less";

import { Affix, Button, Input, Popover, Form, Modal, Empty } from "antd";
import { useHistory } from "react-router-dom";
import { useGetBots, usePostBot } from "hooks/networking/bots";
import handleApiError from "utils/feedback/handleApiError";
import useMountEffect from "hooks/lifecycle/useMountEffect";
import { PlusOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import Avatar from "antd/lib/avatar/avatar";
import requiredFieldRule from "utils/requiredFieldRule";
import UploadImage from "components/UploadImage";
import { botDefault } from "utils/constants";
import PageContainer from "layouts/PageContainer";
import maxLengthFieldRule from "utils/maxLengthFieldRule";

interface Props {}
const BotsPage: React.FC<Props> = () => {
  const [formBot] = Form.useForm();
  const history = useHistory();
  const [bots, setBots] = useState<Models.MiniBot[]>([]);
  const [newBot, setNewBot] = useState(false);
  const [url, setUrl] = useState("");
  const getBots = useGetBots();
  const postBot = usePostBot();

  const navigate = useCallback(
    (link: string) => {
      history.push(link);
    },
    [history]
  );

  const _getBots = useCallback(
    async (name?) => {
      try {
        const { data } = await getBots({ name });
        setBots(data.results);
      } catch (err) {
        handleApiError({
          error: err.data,
          content: "Ocorreu um erro ao buscar bots.",
        });
      }
    },
    [getBots]
  );

  const _postBot = useCallback(
    async (values: any) => {
      try {
        await postBot(values);
        _getBots();
        setNewBot(false);
      } catch (err) {
        handleApiError({
          error: err.data,
          content: "Ocorreu um erro ao cadastrar bot.",
        });
      }
    },
    [_getBots, postBot]
  );

  useMountEffect(() => {
    _getBots();
  });

  const onSearchThrottle = debounce(async (name: string) => {
    await _getBots(name);
  }, 700);

  return (
    <PageContainer
      actions={
        <Input
          style={{ minWidth: 500 }}
          className="input-search-content"
          placeholder="Buscar instituições"
          onChange={(e) => {
            onSearchThrottle(e.target.value);
          }}
        />
      }
    >
      {bots.length > 0 ? (
        <div className="bots-content">
          <div className="list-content">
            <ul className="listagem-padrao">
              {bots.map(({ id, name, avatar, description }) => (
                <li
                  key={id}
                  className="listagem-padrao-item item-list-content"
                  onClick={() => navigate(`/p/bots/${id}/`)}
                >
                  <Avatar size={30} src={avatar || botDefault} />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {name}
                    <small>{description}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <Empty description="Nenhum bot encontrado" />
      )}

      <Affix style={{ position: "absolute", bottom: 32, right: 32 }}>
        <Popover
          content="Clique aqui para criar um novo bot"
          title="Cadastro de bot"
          placement="left"
        >
          <Button
            onClick={() => setNewBot(true)}
            shape="circle"
            style={{ height: 60, width: 60 }}
            size="large"
            type="primary"
            icon={<PlusOutlined />}
          />
        </Popover>
      </Affix>
      <Modal
        title="Cadastrar bot"
        visible={newBot}
        onOk={formBot.submit}
        onCancel={() => setNewBot(false)}
        cancelText="Cancelar"
      >
        <Form form={formBot} onFinish={_postBot} layout="vertical">
          <Form.Item label="Avatar do bot" name="b64">
            <UploadImage onChange={setUrl} value={url} />
          </Form.Item>

          <Form.Item
            rules={[requiredFieldRule, maxLengthFieldRule(32)]}
            name="name"
          >
            <Input placeholder="Nome do novo bot" />
          </Form.Item>
          <Form.Item rules={[maxLengthFieldRule(128)]} name="description">
            <Input.TextArea rows={4} placeholder="Descrição do novo bot" />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default BotsPage;
