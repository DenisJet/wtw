import {initialState, process} from './process';
import {CARDS_SHOW_PER_STEP} from '../../const';
import {
  genreChange,
  incFilmListLength,
  resetApp
} from '../action';

describe(`Reducers 'process' work correctly`, () => {
  it(`Reducer without changed parameters should return initial state`, () => {
    expect(process(undefined, {})).toEqual({activeGenre: `All genres`, filmListLength: CARDS_SHOW_PER_STEP});
  });

  it(`Reducer work correctly for genreChange`, () => {
    const genre = `Comedy`;

    expect(process(initialState, genreChange(genre)))
      .toEqual({
        ...initialState,
        activeGenre: `Comedy`,
      });
  });

  it(`Reducer work correctly for incFilmListLength`, () => {
    expect(process(initialState, incFilmListLength(CARDS_SHOW_PER_STEP)))
      .toEqual({
        ...initialState,
        filmListLength: initialState.filmListLength + CARDS_SHOW_PER_STEP,
      });
  });

  it(`Reducer work correctly for resetApp`, () => {
    const state = {
      activeGenre: `Comedy`,
      filmListLength: CARDS_SHOW_PER_STEP + CARDS_SHOW_PER_STEP,
    };

    expect(process(state, resetApp()))
      .toEqual(initialState);
  });
});
