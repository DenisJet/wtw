import React from "react";
import {Switch, Route} from "react-router-dom";

import MainPage from "../main-page/main-page";
import LoginPage from "../login-page/login-page";
import MyListPage from "../my-list-page/my-list-page";
import FilmPage from "../film-page/film-page";
import AddReviewPage from "../add-review-page/add-review-page";
import PlayerPage from "../player-page/player-page";
import NotFoundPage from "../not-found-page/not-found-page";
import PrivateRoute from "../private-route/private-route";

import {AppRoute} from "../../const";

const App = () => {
  return (
    <Switch>
      <Route exact path={AppRoute.MAIN}>
        <MainPage />
      </Route>
      <Route exact path={AppRoute.SINGIN}>
        <LoginPage />
      </Route>
      <PrivateRoute exact
        path={AppRoute.MYLIST}
        render={() => <MyListPage />}>
      </PrivateRoute>
      <Route exact path={AppRoute.FILM}>
        <FilmPage />
      </Route>
      <Route exact path={AppRoute.ADDREVIEW}>
        <AddReviewPage />
      </Route>
      <Route exact path={AppRoute.PLAYER}>
        <PlayerPage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export default App;
