import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createLogicMiddleware } from 'redux-logic'
import { createStore, applyMiddleware, compose } from 'redux'

import 'semantic-ui-css/semantic.min.css'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import reducers from './reducers'
import services from './services'

// Create redux-logic middleware
const logicMiddleware = createLogicMiddleware(services, {});

// Middlewares: applyMiddleware() tells createStore() how to handle middleware
const middleware = applyMiddleware(logicMiddleware)

// Create enhancer
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(middleware)

// Create store
let store = createStore(reducers, enhancer);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
