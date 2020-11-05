import React from "react";
import {
  MessageOutlined,
  CodeSandboxOutlined,
  CodeOutlined,
  CaretRightOutlined,
  UploadOutlined,
  DownloadOutlined,
  ForkOutlined,
  SisternodeOutlined,
  DeploymentUnitOutlined,
  UserSwitchOutlined,
  WarningOutlined,
} from "@ant-design/icons";

export const flowLabels: Record<Models.NodeType, string> = {
  start: "Início",
  message: "Mensagem",
  conditional: "Condicional",
  script: "ScriptJS",
  declaration: "Declaração",
  input: "Entrada",
  switch: "Seleção",
  forward: "Ir para",
  request: "Requisição",
  attendance: "Atendimento",
  end: "Fim",
};

export const flowIcons: Record<Models.NodeType, React.ReactNode> = {
  message: <MessageOutlined />,
  script: <CodeOutlined />,
  conditional: <CodeSandboxOutlined />,
  start: <CaretRightOutlined />,
  declaration: <UploadOutlined />,
  input: <DownloadOutlined />,
  switch: <ForkOutlined style={{ transform: "rotate(90deg)" }} />,
  forward: <SisternodeOutlined />,
  request: <DeploymentUnitOutlined />,
  attendance: <UserSwitchOutlined />,
  end: <WarningOutlined />,
};

export const nodeHasOutPort: Record<Models.NodeType, boolean> = {
  message: true,
  script: true,
  conditional: false,
  start: true,
  declaration: true,
  input: true,
  switch: false,
  forward: false,
  request: true,
  attendance: true,
  end: false,
};

export const nodeIsDynamic: Record<Models.NodeType, boolean> = {
  message: false,
  script: false,
  conditional: true,
  start: false,
  declaration: false,
  input: false,
  switch: true,
  forward: false,
  request: false,
  attendance: false,
  end: false,
};
