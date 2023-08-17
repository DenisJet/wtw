import {createReducer} from '@reduxjs/toolkit';
import {
  requireAuthorization,
  getUserData,
  getFavoriteList,
} from '../action';
import {AuthorizationStatus} from '../../const';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  userData: {},
  favoriteList: [],
};

const user = createReducer(initialState, (builder) => {
  builder.addCase(requireAuthorization, (state, action) => {
    state.authorizationStatus = action.payload;
  });

  builder.addCase(getUserData, (state, action) => {
    state.userData = action.payload;
  });

  builder.addCase(getFavoriteList, (state, action) => {
    state.favoriteList = action.payload;
  });
});

export {user, initialState};
