import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './app';
import {CARDS_SHOW_PER_STEP, AuthorizationStatus, AppRoute, ApiRoute} from '../../const';
import {promoFilmMock} from '../../mocks/promo-film-mocks';
import {filmsMocks} from '../../mocks/films-mocks';

const mockStore = configureStore({});

const initialState = {
  DATA: {
    filmData: filmsMocks,
    film: {},
    isDataLoaded: true,
    filmCimments: [],
    promoFilm: promoFilmMock,
  },
  PROCESS: {
    activeGenre: `All genres`,
    filmListLength: CARDS_SHOW_PER_STEP,
  },
  USER: {
    authorizationStatus: AuthorizationStatus.AUTH,
    userData: {},
    favoriteList: [],
  },
};

const store = mockStore(initialState);
const history = createMemoryHistory();

store.dispatch = () => Promise.resolve();

const fakeApp = (
  <redux.Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </redux.Provider>
);

const filmId = 1;

describe(`Test routing`, () => {
  it(`Render 'MainPage' when user navigate to ${AppRoute.MAIN} url`, () => {
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();

    render(fakeApp);

    expect(screen.getByText(/all genres/i)).toBeInTheDocument();
    expect(screen.getByText(/Show more/i)).toBeInTheDocument();
  });

  it(`Render 'LoginPage' when user navigate to ${AppRoute.SINGIN} url`, () => {
    history.push(`${AppRoute.SINGIN}`);

    const noAuthState = {
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      }
    };
    const noAuthStore = mockStore(noAuthState);

    render(
        <redux.Provider store={noAuthStore}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByRole(`button`)).toHaveTextContent(/Sign in/i);
  });

  it(`Render 'FilmPage' when user navigate to '/films/:id' url`, () => {
    history.push(`${ApiRoute.FILMS}/${filmId}`);

    render(fakeApp);

    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });

  it(`Render 'AddReviewPage' when user navigate to '/films/:id/review' url`, () => {
    history.push(`${ApiRoute.FILMS}/${filmId}/review`);

    render(fakeApp);

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

  it(`Render 'PlayerPage' when user navigate to '/player/:id' url`, () => {
    history.push(`/player/${filmId}`);

    render(fakeApp);

    expect(screen.getByRole(`button`)).toHaveTextContent(/Exit/i);
  });

  it(`Render 'MyListPage' when user navigate to '/mylist' url`, () => {
    history.push(`${AppRoute.MYLIST}`);

    render(fakeApp);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it(`Render 'NotFoundPage' when user navigate to non-existent-route url`, () => {
    history.push(`/non-existent-route`);

    render(fakeApp);

    expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
  });
});
