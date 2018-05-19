import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import thunk from 'redux-thunk'
import Login from './containers/Login/Login'
import Register from './containers/Register/Register'
import AuthRoute from '@/components/authRoute'
import reducers from '@/reducers/index.reducer'
// import { checkAuth } from '@/utils/checkAuth'
import './config.js'

const store = createStore(reducers, applyMiddleware(thunk))

const Dashboard = function () {
  return <div>这是首页</div>
}

function checkAuth() {
  console.log(2222)
}
ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <AuthRoute path="/dashboard" component={Dashboard} onEnter={checkAuth} />
          <Route path="/login" component={Login} onEnter={() => { console.log(111) }} />
          <Route path="/register" component={Register} />
        </div>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root'));
registerServiceWorker();
