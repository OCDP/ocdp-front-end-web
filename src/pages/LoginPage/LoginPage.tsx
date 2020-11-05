import React, { useCallback } from "react";
import "./LoginPage.less";

import { Form, Input, Button } from "antd";
import copyright from "utils/copyright";
import { useHistory } from "react-router-dom";
import { usePostLogin } from "hooks/networking/auth";
import handleApiError from "utils/feedback/handleApiError";
import SobreVidas from "icons/SobreVidas";

const conpyrightLabel = copyright();

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const postLogin = usePostLogin();

  const _postLogin = useCallback(
    async (values: any) => {
      try {
        const { data } = await postLogin(values);
        console.log(JSON.stringify(data));
        history.replace("/p/bots");
      } catch (err) {
        handleApiError({
          error: err.data,
          content: "Dados incorretos",
        });
      }
    },
    [history, postLogin]
  );

  return (
    <div className="background">
      <div className="logomarca">
        <SobreVidas size={200} />
      </div>
      <article className="login-form-wrapper">
        <Form
          className="login-form"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={_postLogin}
        >
          <section className="login-form-header">Iniciar sessão</section>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Digite seu login" }]}
          >
            <Input
              size="large"
              placeholder="Login"
              style={{ padding: "6px 12px" }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Digite sua senha" }]}
          >
            <Input.Password size="large" placeholder="Senha" />
          </Form.Item>
          <Form.Item>
            <Button
              className="login-action"
              type="primary"
              htmlType="submit"
              size="large"
              onClick={form.submit}
            >
              Iniciar sessão
            </Button>
          </Form.Item>
          <Button
            className="password-recovery-action"
            size="small"
            type="link"
            onClick={() => {}}
          >
            Esqueci minha senha
          </Button>
        </Form>

        <div className="separator" />
        <section className="illustration">
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/846/846941.svg"
            alt="ilustração"
          />
        </section>
      </article>
      <div className="copyright">{conpyrightLabel}</div>
    </div>
  );
};

export default LoginPage;
