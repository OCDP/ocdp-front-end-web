import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import PrivateRoute from "hocs/PrivateRoute";
import EmptyFlow from "components/EmptyFlow";
import FlowEditor from "components/FlowEditor";
import EditorContainer from "layouts/EditorContainer";
import NavigatorBot from "components/NavigatorBot";
import useMountEffect from "hooks/lifecycle/useMountEffect";

const EditorSwitcher: React.FC = () => {
  const { path: routePath } = useRouteMatch();

  useMountEffect(() => console.log({ routePath }));

  return (
    <EditorContainer>
      <NavigatorBot />
      <Switch>
        <PrivateRoute path={`${routePath}/:id_flow`} component={FlowEditor} />
        <PrivateRoute exact path={routePath} component={EmptyFlow} />
      </Switch>
    </EditorContainer>
  );
};

export default EditorSwitcher;
