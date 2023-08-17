import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import MainPage from './main-page';
import {filmsMocks} from '../../mocks/films-mocks';
import {CARDS_SHOW_PER_STEP} from '../../const';

const mockStore = configureStore({});

it(`FilmCard should be render correctly`, () => {
  const store = mockStore({
    DATA: {
      filmData: filmsMocks,
      promoFilm: filmsMocks[0],
      isDataLoaded: true,
    },
    PROCESS: {
      activeGenre: ``,
      filmListLength: CARDS_SHOW_PER_STEP,
    },
    USER: {
      authorizationStatus: ``,
      userData: {},
    }
  });
  const history = createMemoryHistory();

  store.dispatch = () => Promise.resolve();

  render(
      <Provider store={store}>
        <Router history={history}>
          <MainPage />
        </Router>
      </Provider>
  );

  expect(screen.getByText(/Fantastic Beasts: The Crimes of Grindelwald/i)).toBeInTheDocument();
  expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  expect(screen.getByText(/Show more/i)).toBeInTheDocument();
});
