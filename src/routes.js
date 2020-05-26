import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { PrivateRoute } from "./PrivateRoute";
import DashBoard from "./components/dashboard";
import Bairro from "./components/bairro";
import Cidade from "./components/cidade";
import Login from "./components/tela-login";
import Erro404 from "./components/error/Erro404";
import Header from "./components/header";

import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const Routes = () => {
    return (
        <BrowserRouter history={history}>
            <Header />
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <PrivateRoute path="/dashboard" component={DashBoard}/>
                    <PrivateRoute path="/bairro" component={Bairro}/>
                    <PrivateRoute path="/cidade" component={Cidade}/>

                    <Route path="*" component={Erro404}/>
                </Switch>
        </BrowserRouter>
);
}
export default Routes;