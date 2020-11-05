import { Button, Drawer, Space } from "antd";
import React, { createContext, useCallback, useMemo, useState } from "react";

const AppContext = createContext({} as Contexts.App);

export const AppProvider: React.FC = ({ children }) => {
  const [drawerProps, setDrawerProps] = useState<Models.AppDrawer>();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const closeDrawer = useCallback(() => {
    setDrawerVisible(false);
    setTimeout(() => setDrawerProps(undefined), 500);
  }, []);

  const sizes = useMemo(
    (): Record<Models.DrawerSize, string> => ({
      sm: "300px",
      md: "500px",
      lg: "900px",
    }),
    []
  );

  const openDrawer = useCallback(
    ({
      content = <></>,
      onOk: _onOk = () => {},
      onCancel: _onCancel = () => {},
      title = "Detalhes",
      size = "md",
      overflow = "auto",
    }: Models.AppDrawer) => {
      const onOk = () => {
        _onOk();
      };
      const onCancel = () => {
        closeDrawer();
        _onCancel();
      };

      setDrawerVisible(true);
      setDrawerProps({ content, onOk, onCancel, overflow, title, size });
      return closeDrawer;
    },
    [closeDrawer]
  );

  const drawerContentStyle: React.CSSProperties = useMemo(() => {
    const style = { height: "100%", width: "100%" };
    if (drawerProps?.overflow instanceof Array) {
      const [overflowX, overflowY] = drawerProps.overflow;
      return { ...style, overflowX, overflowY };
    }
    return { ...style, overflow: drawerProps?.overflow || "auto" };
  }, [drawerProps]);

  return (
    <AppContext.Provider value={{ drawerVisible, openDrawer, closeDrawer }}>
      <Drawer
        width={sizes[drawerProps?.size!]}
        visible={drawerVisible}
        closable={false}
        maskClosable={false}
        onClose={drawerProps?.onCancel}
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ margin: 0 }}>{drawerProps?.title}</h3>
            <Space>
              <Button size="large" onClick={drawerProps?.onCancel} type="link">
                Cancelar
              </Button>
              <Button size="large" onClick={drawerProps?.onOk} type="primary">
                Confirmar
              </Button>
            </Space>
          </div>
        }
      >
        <section style={drawerContentStyle}>{drawerProps?.content}</section>
      </Drawer>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
