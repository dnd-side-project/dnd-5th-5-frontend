import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import SWRDevtools from '@jjordy/swr-devtools';
import { cache, mutate } from 'swr';
import rootReducer, { rootSaga } from './modules';
import App from './App';
import './index.css';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <SWRDevtools cache={cache} mutate={mutate} />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
