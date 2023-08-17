import {combineReducers} from 'redux';
import {data} from './data/data';
import {process} from './process/process';
import {user} from './user/user';

export const NameSpace = {
  DATA: `DATA`,
  PROCESS: `PROCESS`,
  USER: `USER`
};

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.PROCESS]: process,
  [NameSpace.USER]: user,
});

// import {createReducer} from '@reduxjs/toolkit';
// import {
//   genreChange,
//   loadFilmData,
//   incFilmListLength,
//   resetApp,
//   requireAuthorization,
//   getUserData, loadFilm,
//   loadPromoFilm,
//   loadFilmComments} from './action';
// import {CARDS_SHOW_PER_STEP, AuthorizationStatus} from '../const';

// export const initialState = {
//   activeGenre: `All genres`,
//   filmData: [],
//   film: {},
//   filmComments: [],
//   promoFilm: {},
//   isDataLoaded: false,
//   filmListLength: CARDS_SHOW_PER_STEP,
//   authorizationStatus: AuthorizationStatus.NO_AUTH,
//   userData: {},
// };

// const reducer = createReducer(initialState, (builder) => {
//   builder.addCase(loadFilmData, (state, action) => {
//     return {
//       ...state,
//       filmData: action.payload,
//       isDataLoaded: true,
//     };
//   });

//   builder.addCase(loadFilm, (state, action) => {
//     return {
//       ...state,
//       film: action.payload,
//     };
//   });

//   builder.addCase(loadFilmComments, (state, action) => {
//     return {
//       ...state,
//       filmComments: action.payload,
//     };
//   });

//   builder.addCase(loadPromoFilm, (state, action) => {
//     return {
//       ...state,
//       promoFilm: action.payload,
//     };
//   });

//   builder.addCase(genreChange, (state, action) => {
//     return {
//       ...state,
//       activeGenre: action.payload,
//     };
//   });

//   builder.addCase(incFilmListLength, (state, action) => {
//     let length = state.filmListLength + action.payload;
//     return {
//       ...state,
//       filmListLength: length,
//     };
//   });

//   builder.addCase(resetApp, (state) => {
//     return {
//       ...state,
//       activeGenre: `All genres`,
//       filmListLength: CARDS_SHOW_PER_STEP,
//     };
//   });

//   builder.addCase(requireAuthorization, (state, action) => {
//     return {
//       ...state,
//       authorizationStatus: action.payload,
//     };
//   });

//   builder.addCase(getUserData, (state, action) => {
//     return {
//       ...state,
//       userData: action.payload
//     };
//   });
// });

// export default reducer;
