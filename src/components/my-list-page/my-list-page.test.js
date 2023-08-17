import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import MyListPage from './my-list-page';

const mockStore = configureStore({});

it(`MyListPage should be render correctly`, () => {
  const store = mockStore({
    USER: {
      authorizationStatus: ``,
      userData: {},
      favoriteList: [],
    }
  });
  const history = createMemoryHistory();

  store.dispatch = () => Promise.resolve();

  render(
      <Provider store={store}>
        <Router history={history}>
          <MyListPage />
        </Router>
      </Provider>
  );

  expect(screen.getByText(/My list/i)).toBeInTheDocument();
});
