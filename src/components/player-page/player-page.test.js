import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import PlayerPage from './player-page';

const mockStore = configureStore({});

it(`MyListPage should be render correctly`, () => {
  const store = mockStore({
    DATA: {
      film: {},
      promoFilm: {},
    }
  });
  const history = createMemoryHistory();

  store.dispatch = () => Promise.resolve();

  render(
      <Provider store={store}>
        <Router history={history}>
          <PlayerPage />
        </Router>
      </Provider>
  );

  expect(screen.getByText(/Exit/i)).toBeInTheDocument();
});
