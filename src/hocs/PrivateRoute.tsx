import React, {
  useContext,
  memo,
  Suspense,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Route, RouteProps, useHistory, Redirect } from "react-router-dom";
import UserContext from "contexts/UserContext";
import FadeLoading from "components/FadeLoading";
import { Modal, Button } from "antd";
import logout from "utils/logout";

interface Props {
  component: React.FC<any>;
  lazy?: boolean;
  guard?: () => boolean;
}
const PrivateRoute: React.FC<Props & RouteProps> = ({
  component: Component,
  lazy = false,
  guard = () => true,
  ...routeProps
}) => {
  const { isAuthenticated, user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [canActivate] = useState(guard);
  const history = useHistory();

  useEffect(() => {
    if (!canActivate) {
      setShowModal(true);
    }
  }, [canActivate]);

  const goBack = useCallback(() => {
    history.replace(`/p/`);
    window.location.reload();
  }, [history]);

  return (
    <>
      {canActivate && (
        <Route
          {...routeProps}
          render={(props) => {
            if (lazy) {
              return (
                <Suspense fallback={<FadeLoading loading />}>
                  <Component {...props} />
                </Suspense>
              );
            } else return <Component {...props} />;
          }}
        />
      )}
      <Modal
        visible={showModal}
        centered
        title="ACESSO NEGADO"
        closable={false}
        footer={[
          <Button key="cancel" type="link" onClick={goBack}>
            Não
          </Button>,
          <Button key="ok" type="primary" onClick={() => logout()}>
            Sim, quero trocar de usuário
          </Button>,
        ]}
      >
        {isAuthenticated ? (
          <>
            O usuário <b>{user.username}</b> não tem permissão para acessar essa
            funcionalidade.
            <br />
            <br />
            Deseja autenticar com um usuário diferente?
            <br />
            <small>
              Obs.: Você também pode trocar de perfil no canto superior
              esquerdo.
            </small>
          </>
        ) : (
          <Redirect to={"/login"} />
        )}
      </Modal>
    </>
  );
};

export default memo(PrivateRoute);
