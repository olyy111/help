import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

const store = createStore(() => {})




ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <div>1</div>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root'));
registerServiceWorker();
