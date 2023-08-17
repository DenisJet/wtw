const AppRoute = {
  MAIN: `/`,
  SINGIN: `/login`,
  MYLIST: `/mylist`,
  FILM: `/films/:id`,
  ADDREVIEW: `/films/:id/review`,
  PLAYER: `/player/:id`
};

const ApiRoute = {
  FILMS: `/films`,
  COMMENTS: `/comments`,
  FAVORITE: `/favorite`,
  LOGOUT: `/logout`,
};

const CARDS_SHOW_PER_STEP = 8;
const GENRES_LIST_MAX_LENGTH = 9;

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

export {AppRoute, CARDS_SHOW_PER_STEP, AuthorizationStatus, ApiRoute, GENRES_LIST_MAX_LENGTH};
