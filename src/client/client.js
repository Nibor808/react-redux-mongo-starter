import 'babel-polyfill'; // stupid ie, required for .includes()
import 'jQuery/jquery.slim.min';
import 'Bootstrap/javascripts/bootstrap.min';
import './styles/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import store from './store';

const persistor = persistStore(store);

ReactDOM.hydrate(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <BrowserRouter>
        {renderRoutes(Routes)}
      </BrowserRouter>
    </Provider>
  </PersistGate>
  , document.querySelector('#root'));
