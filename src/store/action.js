import {createAction} from '@reduxjs/toolkit';

const ActionType = {
  LOAD_FILM_DATA: `data/loadFilmData`,
  LOAD_FILM: `data/loadFilm`,
  LOAD_FILM_COMMENTS: `data/loadFilmComments`,
  LOAD_PROMO_FILM: `data/loadPromoFilm`,
  GENRE_CHANGE: `main/genreChange`,
  INC_FILM_LIST_LENGTH: `main/incFilmListLength`,
  RESET_APP: `main/resetApp`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  GET_USER_DATA: `user/getUserData`,
  GET_FAVORITE_LIST: `user/getFavoriteList`,
  SET_FILM_FAVORITE: `user/setFilmFavorite`,
  REDIRECT_TO_ROUTE: `main/redirectToRoute`,
};

const loadFilmData = createAction(ActionType.LOAD_FILM_DATA, (filmData) => {
  return {
    payload: filmData,
  };
});

const loadFilm = createAction(ActionType.LOAD_FILM, (film) => {
  return {
    payload: film,
  };
});

const loadFilmComments = createAction(ActionType.LOAD_FILM_COMMENTS, (comments) => {
  return {
    payload: comments,
  };
});

const loadPromoFilm = createAction(ActionType.LOAD_PROMO_FILM, (promoFilm) => {
  return {
    payload: promoFilm,
  };
});

const genreChange = createAction(ActionType.GENRE_CHANGE, (genre) => {
  return {
    payload: genre,
  };
});

const incFilmListLength = createAction(ActionType.INC_FILM_LIST_LENGTH, (stepLength) => {
  return {
    payload: stepLength,
  };
});

const resetApp = createAction(ActionType.RESET_APP);

const requireAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (status) => {
  return {
    payload: status,
  };
});

const getUserData = createAction(ActionType.GET_USER_DATA, (userData) => {
  return {
    payload: userData,
  };
});

const getFavoriteList = createAction(ActionType.GET_FAVORITE_LIST, (favoriteList) => {
  return {
    payload: favoriteList,
  };
});
const setFilmFavorite = createAction(ActionType.SET_FILM_FAVORITE, (film) => {
  return {
    payload: film,
  };
});

const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => {
  return {
    payload: url,
  };
});

export {
  ActionType,
  loadFilmData,
  genreChange,
  incFilmListLength,
  resetApp,
  requireAuthorization,
  getUserData,
  redirectToRoute,
  loadFilm,
  loadPromoFilm,
  loadFilmComments,
  getFavoriteList,
  setFilmFavorite
};
