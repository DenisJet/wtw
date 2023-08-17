import React, {useEffect} from "react";
import {Link, useParams, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {getLikeThisFilmList} from '../../store/selectors';

import {AppRoute, AuthorizationStatus} from '../../const';
import Tabs from "../tabs/tabs";

import PropTypes from 'prop-types';
import {CommentTypes} from "../../prop-types/comment-types";
import FilmCardsList from "../film-card-list/film-card-list";
import {fetchFilm, fetchFilmComments, fetchFilmList, postFavoriteFilm} from "../../store/api-action";
import UserBlock from "../user-block/user-block";
import {toast} from 'react-toastify';

const FilmPage = () => {
  const {film, filmComments, isDataLoaded} = useSelector((state) => state.DATA);
  const {authorizationStatus, userData} = useSelector((state) => state.USER);

  const likeThisFilmList = useSelector(getLikeThisFilmList);

  const history = useHistory();
  const dispatch = useDispatch();
  const id = Number(useParams().id);

  useEffect(() => {
    dispatch(fetchFilm(id));
    dispatch(fetchFilmComments(id));
  }, [id]);

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchFilmList())
      .catch(() => {
        toast(`Loading error`);
      });
    }
  }, [isDataLoaded]);

  const onAddMyListButtonClick = () => {
    if (authorizationStatus === AuthorizationStatus.AUTH) {
      const filmId = film.id;
      const status = Number(true);

      dispatch(postFavoriteFilm(filmId, status))
      .then(() => {
        history.push(AppRoute.MYLIST);
      });
    } else {
      history.push(AppRoute.SINGIN);
    }
  };

  return (
    <>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img
              src={film.previewImage}
              alt={film.name}
            />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <Link to={AppRoute.MAIN} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <UserBlock authorizationStatus={authorizationStatus} userData={userData} />
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{film.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{film.genre}</span>
                <span className="movie-card__year">{film.released}</span>
              </p>

              <div className="movie-card__buttons">
                <button
                  className="btn btn--play movie-card__button"
                  type="button"
                  onClick={() => {
                    history.push(`/player/${film.id}`);
                  }}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list movie-card__button"
                  type="button"
                  onClick={onAddMyListButtonClick}
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                {authorizationStatus === AuthorizationStatus.AUTH ?
                  <Link to={`/films/${film.id}/review`} className="btn movie-card__button">
                    Add review
                  </Link> : ``}
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img
                src={film.previewImage}
                alt={`${film.previewImage} poster`}
                width="218"
                height="327"
              />
            </div>
            <Tabs film={film} comments={filmComments} />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmCardsList films={likeThisFilmList} />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

FilmPage.propTypes = {
  comments: PropTypes.arrayOf(CommentTypes),
};

export default FilmPage;
