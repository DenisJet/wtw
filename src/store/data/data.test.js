/* eslint-disable max-nested-callbacks */
import MockAdapter from 'axios-mock-adapter';
import createAPI from '../../services/api';
import {data, initialState} from './data';
import {filmsMocks} from '../../mocks/films-mocks';
import {commentsMocks} from '../../mocks/comments-mocks';
import {loadFilm, loadFilmComments, loadFilmData, loadPromoFilm, redirectToRoute, setFilmFavorite} from '../action';
import {fetchFilm, fetchFilmComments, fetchFilmList, fetchPromoFilm, postComment} from '../api-action';
import {ApiRoute} from '../../const';

const api = createAPI(() => {});

describe(`Reducer 'data' should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(data(undefined, {}))
      .toEqual(initialState);
  });

  it(`Reducer work correctly for loadFilmData`, () => {
    expect(data(initialState, loadFilmData(filmsMocks)))
      .toEqual({
        ...initialState,
        filmData: filmsMocks,
        isDataLoaded: true,
      });
  });

  it(`Reducer work correctly for loadFilmComments`, () => {
    expect(data(initialState, loadFilmComments(commentsMocks)))
      .toEqual({
        ...initialState,
        filmComments: commentsMocks,
      });
  });

  it(`Reducer work correctly for loadPromoFilm`, () => {
    expect(data(initialState, loadPromoFilm(filmsMocks[0])))
      .toEqual({
        ...initialState,
        promoFilm: filmsMocks[0],
      });
  });

  it(`Reducer work correctly for setFilmFavorite`, () => {
    const favoriteFilm = {...filmsMocks[0], isFaforite: true};
    const state = {
      ...initialState,
      filmData: filmsMocks,
    };

    expect(data(state, setFilmFavorite(favoriteFilm)))
      .toEqual({
        ...state,
        filmData: [
          ...state.filmData.slice(0, favoriteFilm.id - 1),
          favoriteFilm,
          ...state.filmData.slice(favoriteFilm.id, filmsMocks.length)
        ],
      });
  });
});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call for fetchFilmList`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmsLoader = fetchFilmList();

    apiMock
      .onGet(ApiRoute.FILMS)
      .reply(200, []);

    return filmsLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, loadFilmData([]));
      });
  });

  it(`Should make a correct API call for fetchFilm`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmId = 1;
    const filmLoader = fetchFilm(filmId);

    apiMock
      .onGet(`${ApiRoute.FILMS}/${filmId}`)
      .reply(200, {});

    return filmLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, loadFilm({}));
      });
  });

  it(`Should make a correct API call for fetchFilmComments`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmId = 1;
    const commentsLoader = fetchFilmComments(filmId);

    apiMock
      .onGet(`${ApiRoute.COMMENTS}/${filmId}`)
      .reply(200, []);

    return commentsLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, loadFilmComments([]));
      });
  });

  it(`Should make a correct API call for postComment`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmId = 1;
    const rating = 10;
    const commentPoster = postComment(filmId, {}, rating);

    apiMock
      .onPost(`${ApiRoute.COMMENTS}/${filmId}`)
      .reply(200, {});

    return commentPoster(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, redirectToRoute(`${ApiRoute.FILMS}/${filmId}`));
      });
  });

  it(`Should make a correct API call for fetchPromoFilm`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoFilmLoader = fetchPromoFilm();

    apiMock
      .onGet(`${ApiRoute.FILMS}/promo`)
      .reply(200, {});

    return promoFilmLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, loadPromoFilm({}));
      });
  });
});
