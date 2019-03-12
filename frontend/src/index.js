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
import {receiveMsg} from '@/reducers/chat'


const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f=>f
))

// 初始化应用的时候就开始接受信息
store.dispatch(receiveMsg())


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
