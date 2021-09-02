import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { history } from './app/store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';

import Search from './components/Search/Search';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App>
    <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" render={() => (<Search/>)}/>
    </Switch>
    </ConnectedRouter>
    </App>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);