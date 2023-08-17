import React from 'react';
import ReactDOM from 'react-dom';
import {ToastContainer} from 'react-toastify';

import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

import {Router as BrowserRouter} from 'react-router-dom';
import browserHistory from './browser-history';

import App from './components/app/app';

import rootReducer from './store/root-reducer';
import createAPI from './services/api';
import {requireAuthorization} from './store/action';
import {checkAuth} from './store/api-action';
import {redirect} from './store/middlewares/redirect';
import {AuthorizationStatus} from './const';
import 'react-toastify/dist/ReactToastify.css';

const api = createAPI(() => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)));

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      },
    }).concat(redirect)
});

store.dispatch(checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </Provider>,

    document.querySelector(`#root`)
);
