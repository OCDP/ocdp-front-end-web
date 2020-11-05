import React from "react";
import "./PageContainer.less";

import { Button, Divider, Layout, Popover, Space, Typography } from "antd";

import Avatar from "antd/lib/avatar/avatar";
import { botDefault } from "utils/constants";
import {
  LogoutOutlined,
  UserOutlined,
  ShopOutlined,
  RightOutlined,
} from "@ant-design/icons";
import logout from "utils/logout";

interface Props {
  menu?: React.ReactNode;
  actions?: React.ReactNode;
}

const PageContainer: React.FC<Props> = ({
  children,
  menu = <></>,
  actions,
}) => {
  return (
    <Layout>
      <Layout.Header className="page-header">
        <div className="menu-wrapper">{menu}</div>

        <Space className="actions-wrapper">
          {actions && (
            <>
              {actions}
              <Divider type="vertical" />
            </>
          )}

          <Popover
            placement="bottomLeft"
            trigger="click"
            content={
              <Space direction="vertical" style={{ width: 256 }}>
                <Typography.Title
                  type="secondary"
                  level={4}
                  ellipsis={{ rows: 1 }}
                >
                  Usuário de teste
                </Typography.Title>
                <ul className="listagem-padrao">
                  <li className="listagem-padrao-item">
                    <UserOutlined />
                    <div style={{ maxWidth: 172 }}>
                      <Typography.Paragraph
                        style={{ margin: 0 }}
                        ellipsis={{ rows: 1 }}
                      >
                        Meu perfil
                      </Typography.Paragraph>
                    </div>
                    <div />
                    <RightOutlined />
                  </li>
                  <li className="listagem-padrao-item">
                    <ShopOutlined />
                    <div style={{ maxWidth: 172 }}>
                      <Typography.Paragraph
                        style={{ margin: 0 }}
                        ellipsis={{ rows: 1 }}
                      >
                        Instituições
                      </Typography.Paragraph>
                    </div>
                    <div />
                    <RightOutlined />
                  </li>
                </ul>
                <Button
                  type="primary"
                  danger
                  icon={<LogoutOutlined />}
                  size="small"
                  style={{ width: 256 }}
                  // @ts-ignore
                  onClick={logout}
                >
                  Sair
                </Button>
              </Space>
            }
          >
            <Avatar className="user-avatar" src={botDefault} size={32} />
          </Popover>
        </Space>
      </Layout.Header>

      {children}
    </Layout>
  );
};

export default PageContainer;
