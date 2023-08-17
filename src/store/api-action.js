import {loadFilmData,
  requireAuthorization,
  getUserData,
  redirectToRoute,
  loadFilm,
  loadPromoFilm,
  loadFilmComments,
  getFavoriteList,
  setFilmFavorite} from './action';
import {AuthorizationStatus, AppRoute, ApiRoute} from '../const';

const adaptFilmToClient = (film) => {
  const adaptedFilm = Object.assign(
      {},
      film,
      {
        posterImage: film.poster_image,
        previewImage: film.preview_image,
        backgroundImage: film.background_image,
        backgroundColor: film.background_color,
        videoLink: film.video_link,
        previewVideoLink: film.preview_video_link,
        scoresCount: film.scores_count,
        runTime: film.run_time,
        isFavorite: film.is_favorite,
      },
  );

  delete adaptedFilm.poster_image;
  delete adaptedFilm.preview_image;
  delete adaptedFilm.background_image;
  delete adaptedFilm.background_color;
  delete adaptedFilm.video_link;
  delete adaptedFilm.preview_video_link;
  delete adaptedFilm.scores_count;
  delete adaptedFilm.run_time;
  delete adaptedFilm.is_favorite;

  return adaptedFilm;
};

const adaptUserDataToClient = (userData) => {
  const adaptedUserData = Object.assign(
      {},
      userData,
      {
        avatarUrl: userData.avatar_url,
      },
  );

  delete adaptedUserData.avatar_url;

  return adaptedUserData;
};

const fetchFilmList = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.FILMS)
    .then(({data}) => dispatch(loadFilmData(data.map((item) => {
      return adaptFilmToClient(item);
    }))))
);

const fetchFilm = (id) => (dispatch, _getState, api) => (
  api.get(`${ApiRoute.FILMS}/${id}`)
    .then(({data}) => dispatch(loadFilm(adaptFilmToClient(data))))
);

const fetchFilmComments = (filmId) => (dispatch, _getState, api) => (
  api.get(`${ApiRoute.COMMENTS}/${filmId}`)
    .then(({data}) => dispatch(loadFilmComments(data)))
);

const postComment = (filmId, comment, rating) => (dispatch, _getState, api) => (
  api.post(`${ApiRoute.COMMENTS}/${filmId}`, {comment, rating})
    .then(() => dispatch(redirectToRoute(`${ApiRoute.FILMS}/${filmId}`)))
);

const fetchPromoFilm = () => (dispatch, _getState, api) => (
  api.get(`${ApiRoute.FILMS}/promo`)
    .then(({data}) => dispatch(loadPromoFilm(adaptFilmToClient(data))))
);

const checkAuth = () => (dispatch, _getState, api) => (
  api.get(AppRoute.SINGIN)
    .then(({data}) => {
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(getUserData(adaptUserDataToClient(data)));
    })
    .catch(() => { })
);

const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(AppRoute.SINGIN, {email, password})
    .then(({data}) => {
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(getUserData(adaptUserDataToClient(data)));
    }).then(() => dispatch(redirectToRoute(AppRoute.MAIN)))
);

const logout = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.LOGOUT)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)))
    .then(() => dispatch(redirectToRoute(AppRoute.MAIN)))
);

const fetchFavoriteList = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.FAVORITE)
    .then(({data}) => dispatch(getFavoriteList(data.map((item) => {
      return adaptFilmToClient(item);
    }))))
);

const postFavoriteFilm = (filmId, status) => (dispatch, _getState, api) => (
  api.post(`${ApiRoute.FAVORITE}/${filmId}/${status}`)
    .then(({data}) => dispatch(setFilmFavorite(adaptFilmToClient(data))))
);

export {fetchFilmList,
  fetchFilm,
  checkAuth,
  login,
  fetchPromoFilm,
  fetchFilmComments,
  postComment,
  fetchFavoriteList,
  postFavoriteFilm,
  logout
};
