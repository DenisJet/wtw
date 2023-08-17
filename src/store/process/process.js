import {createReducer} from '@reduxjs/toolkit';
import {
  genreChange,
  incFilmListLength,
  resetApp,
} from '../action';
import {CARDS_SHOW_PER_STEP} from '../../const';

const initialState = {
  activeGenre: `All genres`,
  filmListLength: CARDS_SHOW_PER_STEP,
};

const process = createReducer(initialState, (builder) => {
  builder.addCase(genreChange, (state, action) => {
    state.activeGenre = action.payload;
  });

  builder.addCase(incFilmListLength, (state, action) => {
    let length = state.filmListLength + action.payload;
    state.filmListLength = length;
  });

  builder.addCase(resetApp, (state) => {
    state.activeGenre = `All genres`;
    state.filmListLength = CARDS_SHOW_PER_STEP;
  });
});

export {process, initialState};
