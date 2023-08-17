import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import FilmPage from './film-page';
import {filmsMocks} from '../../mocks/films-mocks';
import {commentsMocks} from '../../mocks/comments-mocks';

const mockStore = configureStore({});

it(`FilmCard should be render correctly`, () => {
  const store = mockStore({
    DATA: {
      filmData: filmsMocks,
      film: filmsMocks[0],
      filmComments: commentsMocks,
      isDataLoaded: true,
    },
    USER: {
      authorizationStatus: ``,
      userData: {},
    }
  });
  const history = createMemoryHistory();

  store.dispatch = () => Promise.resolve();

  window.HTMLMediaElement.prototype.pause = jest.fn();
  window.HTMLMediaElement.prototype.load = jest.fn();

  render(
      <Provider store={store}>
        <Router history={history}>
          <FilmPage />
        </Router>
      </Provider>
  );

  expect(screen.getByText(/Fantastic Beasts: The Crimes of Grindelwald/i)).toBeInTheDocument();
  expect(screen.getByText(/Overview/i)).toBeInTheDocument();
  expect(screen.getByText(/Details/i)).toBeInTheDocument();
  expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
});
