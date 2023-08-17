import {createReducer} from '@reduxjs/toolkit';
import {
  loadFilmData,
  loadFilm,
  loadPromoFilm,
  loadFilmComments,
  setFilmFavorite,
} from '../action';

const initialState = {
  filmData: [],
  film: {},
  filmComments: [],
  promoFilm: {},
  isDataLoaded: false,
};

const data = createReducer(initialState, (builder) => {
  builder.addCase(loadFilmData, (state, action) => {
    state.filmData = action.payload;
    state.isDataLoaded = true;
  });

  builder.addCase(loadFilm, (state, action) => {
    state.film = action.payload;
  });

  builder.addCase(loadFilmComments, (state, action) => {
    state.filmComments = action.payload;
  });

  builder.addCase(loadPromoFilm, (state, action) => {
    state.promoFilm = action.payload;
  });

  builder.addCase(setFilmFavorite, (state, action) => {
    state.filmData = [
      ...state.filmData.slice(0, action.payload.id - 1),
      action.payload,
      ...state.filmData.slice(action.payload.id, state.filmData.length)
    ];
  });
});

export {data, initialState};
