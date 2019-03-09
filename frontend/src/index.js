import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Router from './router/index'
import reducers from './reducers/index'
import './config.js'
import './assets/css/index.css'


const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f=>f
))


ReactDOM.render(
  (
    <Provider store={store}>
      <Router>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
);
registerServiceWorker();
