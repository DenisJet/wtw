import React, {useEffect} from "react";
import {Link} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';
import {fetchFavoriteList} from "../../store/api-action";

import FilmCardsList from "../film-card-list/film-card-list";
import UserBlock from "../user-block/user-block";

import {AppRoute} from '../../const';


const MyListPage = () => {
  const {favoriteList, userData, authorizationStatus} = useSelector((state) => state.USER);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteList());
  }, []);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.MAIN} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <UserBlock authorizationStatus={authorizationStatus} userData={userData} />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmCardsList films={favoriteList} />
      </section>

      <footer className="page-footer">
        <div className="logo">
          <Link to={AppRoute.MAIN} className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

export default MyListPage;
