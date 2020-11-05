import React, { memo, useCallback } from "react";
import { Menu } from "antd";
import { botsConfig } from "configs/routesConfig";
import "./MenuBot.less";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

interface Props {}
const MenuBot: React.FC<Props> = () => {
  const { path } = useRouteMatch();
  const { id_bot } = useParams() as Dict<string>;
  const history = useHistory();

  const navigate = useCallback(
    (tab: string) => () => history.replace(`/p/bots/${id_bot}/${tab}`),
    [history, id_bot]
  );

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[path.split("/").pop() || "/"]}
    >
      <Menu.Item onClick={() => history.replace("/p/bots/")}>
        <HomeOutlined />
      </Menu.Item>
      {Object.entries(botsConfig).map(([key, item]) => (
        <Menu.Item
          onClick={navigate(key === "dashboard" ? "" : key)}
          key={key === "dashboard" ? "/" : key}
        >
          {item}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default memo(MenuBot);
