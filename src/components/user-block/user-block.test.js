import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import UserBlock from './user-block';
import {AuthorizationStatus} from '../../const';

const mockStore = configureStore({});
const history = createMemoryHistory();

it(`UserBlock should be render correctly`, () => {
  const store = mockStore({});
  store.dispatch = () => Promise.resolve();

  render(
      <Provider store={store}>
        <Router history={history}>
          <UserBlock authorizationStatus={AuthorizationStatus.NO_AUTH} />
        </Router>
      </Provider>
  );

  expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
});
