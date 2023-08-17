import {
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
} from './action';

describe(`Action creators work correctly`, () => {
  it(`Action creator for loadFilmData work correctly`, () => {
    const expectedAction = {
      type: ActionType.LOAD_FILM_DATA,
      payload: [],
    };

    const filmData = [];

    expect(loadFilmData(filmData)).toEqual(expectedAction);
  });

  it(`Action creator for genreChange work correctly`, () => {
    const expectedAction = {
      type: ActionType.GENRE_CHANGE,
      payload: ``,
    };

    const activeGenre = ``;

    expect(genreChange(activeGenre)).toEqual(expectedAction);
  });

  it(`Action creator for incFilmListLength work correctly`, () => {
    const expectedAction = {
      type: ActionType.INC_FILM_LIST_LENGTH,
      payload: 0,
    };

    const filmListLength = 0;

    expect(incFilmListLength(filmListLength)).toEqual(expectedAction);
  });

  it(`Action creator for resetApp work correctly`, () => {
    const expectedAction = {
      type: ActionType.RESET_APP,
    };

    expect(resetApp()).toEqual(expectedAction);
  });

  it(`Action creator for requireAuthorization work correctly`, () => {
    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: ``,
    };

    const authorizationStatus = ``;

    expect(requireAuthorization(authorizationStatus)).toEqual(expectedAction);
  });

  it(`Action creator for getUserData work correctly`, () => {
    const expectedAction = {
      type: ActionType.GET_USER_DATA,
      payload: {},
    };

    const userData = {};

    expect(getUserData(userData)).toEqual(expectedAction);
  });

  it(`Action creator for redirectToRoute work correctly`, () => {
    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: ``,
    };

    const url = ``;

    expect(redirectToRoute(url)).toEqual(expectedAction);
  });

  it(`Action creator for loadFilm work correctly`, () => {
    const expectedAction = {
      type: ActionType.LOAD_FILM,
      payload: {},
    };

    const film = {};

    expect(loadFilm(film)).toEqual(expectedAction);
  });

  it(`Action creator for loadPromoFilm work correctly`, () => {
    const expectedAction = {
      type: ActionType.LOAD_PROMO_FILM,
      payload: {},
    };

    const promoFilm = {};

    expect(loadPromoFilm(promoFilm)).toEqual(expectedAction);
  });

  it(`Action creator for loadFilmComments work correctly`, () => {
    const expectedAction = {
      type: ActionType.LOAD_FILM_COMMENTS,
      payload: [],
    };

    const comments = [];

    expect(loadFilmComments(comments)).toEqual(expectedAction);
  });

  it(`Action creator for getFavoriteList work correctly`, () => {
    const expectedAction = {
      type: ActionType.GET_FAVORITE_LIST,
      payload: [],
    };

    const favoriteList = [];

    expect(getFavoriteList(favoriteList)).toEqual(expectedAction);
  });

  it(`Action creator for setFilmFavorite work correctly`, () => {
    const expectedAction = {
      type: ActionType.SET_FILM_FAVORITE,
      payload: {},
    };

    const film = {};

    expect(setFilmFavorite(film)).toEqual(expectedAction);
  });
});
