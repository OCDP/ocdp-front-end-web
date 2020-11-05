import React, { useCallback, useMemo } from "react";
import "./EditorContainer.less";

import { Layout } from "antd";
import useSharedState from "hooks/useSharedState";
import editorStore from "store/editorStore";
import PageContainer from "layouts/PageContainer";
import MenuBot from "components/MenuBot";

interface Props {
  children: [React.ReactNode, React.ReactNode];
}
const EditorContainer: React.FC<Props> = ({ children }) => {
  const [sider, content] = useMemo(() => children, [children]);

  const [{ collapsed }, setEditorState] = useSharedState(editorStore);

  const toggle = useCallback(() => {
    setEditorState({ collapsed: !collapsed });
  }, [collapsed, setEditorState]);

  return (
    <PageContainer menu={<MenuBot />}>
      <Layout className="site-layout">
        <Layout.Sider
          collapsible
          collapsed={collapsed}
          onCollapse={toggle}
          className="flow-list-wrapper"
        >
          {sider}
        </Layout.Sider>
        <Layout.Content style={{ background: "var(--primary-color-shade)" }}>
          <div
            style={{
              textAlign: "center",
              minHeight: "calc(100vh - 64px)",
            }}
          >
            {content}
          </div>
        </Layout.Content>
      </Layout>
    </PageContainer>
  );
};

export default EditorContainer;
