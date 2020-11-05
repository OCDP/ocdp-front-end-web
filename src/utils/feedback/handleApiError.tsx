import React from "react";
import { Modal, Tag } from "antd";
import { WarningOutlined } from "@ant-design/icons";

type Content = React.ReactNode | string | undefined;
type ErrorHandlerOptions = {
  error: Utils.ApiError;
  title?: string;
  content?: Content;
  meanings?: { [key: string]: string };
  buttonProps?: any;
};

export default function ({
  error = {} as Utils.ApiError,
  title = "Atenção",
  content = "Ocorreu um erro ao executar a ação solicitada.",
  meanings = {},
  buttonProps = {},
}: ErrorHandlerOptions) {
  return new Promise<"ok" | "cancel">((resolve) => {
    const onOk = () => resolve("ok");
    const onCancel = () => resolve("cancel");

    const hasErrorSet = error.errors && Object.keys(error.errors).length > 0;

    Modal.error({
      title,
      centered: true,
      style: hasErrorSet ? { minWidth: 750 } : {},
      okButtonProps: buttonProps,
      content: (
        <>
          <p>{content}</p>
          {hasErrorSet && (
            <>
              <small>Os seguintes erros foram encontrados:</small>
              <ul style={{ listStyle: "unset" }}>
                {Object.entries(error.errors).map(([field, issues]) => (
                  <li style={{ marginBottom: 8 }} key={field}>
                    <small>
                      <b>{(meanings[field] || field).toUpperCase()}:</b>
                    </small>
                    <br />
                    {typeof issues === "string" ? (
                      <Tag
                        style={{ whiteSpace: "pre-wrap" }}
                        color="error"
                        icon={<WarningOutlined />}
                      >
                        {issues}
                      </Tag>
                    ) : (
                      issues.map((issue, issueIndex) => (
                        <Tag
                          key={issueIndex}
                          style={{ whiteSpace: "pre-wrap" }}
                          color="error"
                          icon={<WarningOutlined />}
                        >
                          {issue}
                        </Tag>
                      ))
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      ),
      onOk,
      onCancel,
    });
  });
}
