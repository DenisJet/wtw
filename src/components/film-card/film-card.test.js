import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import FilmCard from './film-card';
import {filmsMocks} from '../../mocks/films-mocks';

const mockStore = configureStore({});
const film = filmsMocks[0];

it(`FilmCard should be render correctly`, () => {
  const store = mockStore({});
  const history = createMemoryHistory();

  window.HTMLMediaElement.prototype.pause = jest.fn();
  window.HTMLMediaElement.prototype.load = jest.fn();

  render(
      <Provider store={store}>
        <Router history={history}>
          <FilmCard film={film} />
        </Router>
      </Provider>
  );

  expect(screen.getByText(/Fantastic Beasts: The Crimes of Grindelwald/i)).toBeInTheDocument();
});
