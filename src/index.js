import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './containers/Login/Login'
import Register from './containers/Register/Register'
import './config.js'

const store = createStore(() => {})




ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root'));
registerServiceWorker();
