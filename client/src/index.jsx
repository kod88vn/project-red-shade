import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store';
import 'babel-polyfill';


import App from './App';
import './index.scss';

const rootEl = document.getElementById('root');
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  rootEl
);

if (module.hot) {
  module.hot.accept();
}
