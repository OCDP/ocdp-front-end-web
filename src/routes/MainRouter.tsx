import PrivateRoute from "hocs/PrivateRoute";
import LoginPage from "pages/LoginPage";
import NotFoundPage from "pages/NotFoundPage";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const PagesSwitcher = React.lazy(() => import("./PagesSwitcher"));

const MainRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute lazy path="/p" component={PagesSwitcher} />

        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default MainRouter;
