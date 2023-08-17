import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import LoginPage from './login-page';

const mockStore = configureStore({});

it(`Render 'LoginScreen' when user navigate to '/login' url`, () => {
  const store = mockStore({
    USER: {authorizationStatus: ``}
  });
  const history = createMemoryHistory();
  history.push(`/login`);

  render(
      <Provider store={store}>
        <Router history={history}>
          <LoginPage />
        </Router>
      </Provider>
  );

  expect(screen.getByTestId(/email/i)).toBeInTheDocument();
  expect(screen.getByTestId(/password/i)).toBeInTheDocument();

  userEvent.type(screen.getByTestId(`email`), `den@mail.com`);
  userEvent.type(screen.getByTestId(`password`), `123456`);

  expect(screen.getByDisplayValue(/den@mail.com/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
});
