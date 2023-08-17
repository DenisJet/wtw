import MockAdapter from 'axios-mock-adapter';
import createAPI from '../../services/api';
import {user, initialState} from './user';
import {getFavoriteList, getUserData, redirectToRoute, requireAuthorization, setFilmFavorite} from '../action';
import {ApiRoute, AppRoute, AuthorizationStatus} from '../../const';
import {filmsMocks} from '../../mocks/films-mocks';
import {checkAuth, fetchFavoriteList, login, logout, postFavoriteFilm} from '../api-action';

const api = createAPI(() => {});
const userData = {
  id: 1,
  email: `Oliver.conner@gmail.com`,
  name: `Oliver.conner`,
  avatarUrl: `img/1.png`
};

describe(`Reducer 'user' should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(user(undefined, {}))
      .toEqual(initialState);
  });

  it(`Reducer should update authorizationStatus to 'auth'`, () => {
    expect(user(initialState, requireAuthorization(AuthorizationStatus.AUTH)))
      .toEqual({
        ...initialState,
        authorizationStatus: AuthorizationStatus.AUTH
      });
  });

  it(`Reducer should work correctly for getUserData`, () => {
    expect(user(initialState, getUserData(userData)))
      .toEqual({
        ...initialState,
        userData,
      });
  });

  it(`Reducer should work correctly for getUserData`, () => {
    expect(user(initialState, getFavoriteList(filmsMocks)))
      .toEqual({
        ...initialState,
        favoriteList: filmsMocks,
      });
  });
});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call for checkAuth`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuth();

    apiMock
      .onGet(AppRoute.SINGIN)
      .reply(200, {});

    return checkAuthLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, requireAuthorization(AuthorizationStatus.AUTH));
        expect(dispatch).toHaveBeenNthCalledWith(2, getUserData({}));
      });
  });

  it(`Should make a correct API call for login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const email = `best@dev.com`;
    const pass = `1234`;
    const loginLoader = login({login: email, pass});

    apiMock
      .onPost(AppRoute.SINGIN)
      .reply(200, {});

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, requireAuthorization(AuthorizationStatus.AUTH));
        expect(dispatch).toHaveBeenNthCalledWith(2, getUserData({}));
        expect(dispatch).toHaveBeenNthCalledWith(3, redirectToRoute(AppRoute.MAIN));
      });
  });

  it(`Should make a correct API call for logout`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutLoader = logout();

    apiMock
      .onGet(ApiRoute.LOGOUT)
      .reply(200, {});

    return logoutLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, requireAuthorization(AuthorizationStatus.NO_AUTH));
        expect(dispatch).toHaveBeenNthCalledWith(2, redirectToRoute(AppRoute.MAIN));
      });
  });

  it(`Should make a correct API call for fetchFavoriteList`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteListLoader = fetchFavoriteList();

    apiMock
      .onGet(ApiRoute.FAVORITE)
      .reply(200, []);

    return favoriteListLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, getFavoriteList([]));
      });
  });

  it(`Should make a correct API call for postFavoriteFilm`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmId = 1;
    const status = 1;
    const favoriteFilmLoader = postFavoriteFilm(filmId, status);

    apiMock
      .onPost(`${ApiRoute.FAVORITE}/${filmId}/${status}`)
      .reply(200, {});

    return favoriteFilmLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, setFilmFavorite({}));
      });
  });
});
