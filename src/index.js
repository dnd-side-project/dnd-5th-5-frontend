import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';
import App from './App';
import GA4React, { useGA4React } from 'ga-4-react';
import './index.css';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const ga4react = new GA4React('G-7JC124T835');
function MyApp() {
  const ga = useGA4React();
  return <App />;
}
(async () => {
  await ga4react.initialize();

  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <MyApp />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  );
})();
