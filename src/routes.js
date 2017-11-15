import React from 'react';  
import { Switch, Route, IndexRoute } from 'react-router-dom';  
import LoginPage from './containers/LoginContainer';
import SignupPage from './containers/SignupContainer';
import App from './components/App'

export default (
    <Switch>
        <Route exact path="/login"> <LoginPage /> </Route>

        <Route exact path="/signup"> <SignupPage /> </Route>

        <Route exact path="/chat"></Route>
    </Switch>
)