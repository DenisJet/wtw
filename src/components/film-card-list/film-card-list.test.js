import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import FilmCardsList from './film-card-list';
import {filmsMocks} from '../../mocks/films-mocks';

const mockStore = configureStore({});
const films = filmsMocks;

it(`FilmCard should be render correctly`, () => {
  const store = mockStore({});
  const history = createMemoryHistory();

  window.HTMLMediaElement.prototype.pause = jest.fn();
  window.HTMLMediaElement.prototype.load = jest.fn();

  render(
      <Provider store={store}>
        <Router history={history}>
          <FilmCardsList films={films} />
        </Router>
      </Provider>
  );

  expect(screen.getByText(/Fantastic Beasts: The Crimes of Grindelwald/i)).toBeInTheDocument();
  expect(screen.getByText(/Bohemian Rhapsody/i)).toBeInTheDocument();
  expect(screen.getByText(/Macbeth/i)).toBeInTheDocument();
});
