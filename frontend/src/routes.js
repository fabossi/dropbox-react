import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from './pages/main';
import BoxPage from './pages/box'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/box/:id" component={BoxPage} />
        </Switch>
    </BrowserRouter>
);

export default Routes;