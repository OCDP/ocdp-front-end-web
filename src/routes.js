import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import DashBoard from "./components/dashboard";
import Bairro from "./components/bairro";
import Cidade from "./components/cidade";
import Login from "./components/tela-login";
import Erro404 from "./components/error/Erro404";
import Header from "./components/header";

const Routes = () => {
    return (
        <BrowserRouter>
            <Header />
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/dashboard" component={DashBoard}/>
                    <Route path="/bairro" component={Bairro}/>
                    <Route path="/cidade" component={Cidade}/>

                    <Route path="*" component={Erro404}/>
                </Switch>
        </BrowserRouter>
);
}
export default Routes;