import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import { DrizzleProvider } from "drizzle-react";

import App from './components/app';
import Home from './components/home';
import Public from './components/public';
import TransferTokensContainer from './components/transferTokens/transferTokensContainer';
import Account from './components/account';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout'
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';
import xToken from './contracts/xToken.json';
import VariableLabsEscrow from './contracts/VariableLabsEscrow.json';

import '../style/style.scss'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers)
const token = localStorage.getItem('auth_jwt_token');
const options = { contracts: [xToken, VariableLabsEscrow] };

// if we have a token, consider the user to be signed in
if (token) {
  store.dispatch({type: AUTH_USER})
}
ReactDOM.render(
  <Provider store={store}>
    <HashRouter hashType="noslash">
    <DrizzleProvider options={options}>
      <App>
        <Switch>
          <Route exact path="/" component= {Home} />
          <Route path="/public" component= {Public} />
          <Route path="/transferTokens" component= {RequireAuth(TransferTokensContainer)} />
          <Route path="/account" component= {RequireAuth(Account)} />
          <Route path="/signin" component= {Signin} />
          <Route path="/signup" component= {Signup} />
          <Route path="/signout" component= {Signout} />
        </Switch>
      </App>
      </DrizzleProvider>
    </HashRouter>
  </Provider>
  , document.getElementById('root'));
