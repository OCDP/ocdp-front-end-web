import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "hocs/PrivateRoute";

const BotsPage = React.lazy(() => import("pages/BotsPage"));
const DashboardPage = React.lazy(() => import("pages/DashboardPage"));
const SettingsPage = React.lazy(() => import("pages/SettingsPage"));
const IntentionsPage = React.lazy(() => import("pages/IntentionsPage"));

const OrganizationPage = React.lazy(() => import("pages/OrganizationPage"));

const NotFoundPage = React.lazy(() => import("pages/NotFoundPage"));

const PagesSwitcher: React.FC = () => {
  return (
    <Switch>
      <PrivateRoute
        exact
        lazy
        path="/p/bots/:id_bot/"
        component={DashboardPage}
      />
      <PrivateRoute
        exact
        lazy
        path="/p/bots/:id_bot/settings"
        component={SettingsPage}
      />
      <PrivateRoute
        exact
        lazy
        path="/p/bots/:id_bot/intentions"
        component={IntentionsPage}
      />
      <PrivateRoute exact lazy path="/p/bots" component={BotsPage} />

      {/* Rotas dedicadas às Organizações */}
      <PrivateRoute lazy path="/p/organization/" component={OrganizationPage} />

      {/* Prevenção contra falhas */}
      <Route path="/p/">
        <Redirect to="/p/bots" />
      </Route>
      <Route exact path="/p/*" component={NotFoundPage} />
    </Switch>
  );
};

export default PagesSwitcher;
