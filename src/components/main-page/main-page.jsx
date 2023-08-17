import React, {useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';
import {getGenresList, getActiveFilmList} from '../../store/selectors';

import FilmCardsList from '../film-card-list/film-card-list';
import GenresList from '../genres-list/genres-list';
import LoadingPage from '../loading-page/loading-page';

import {AppRoute, AuthorizationStatus, CARDS_SHOW_PER_STEP} from '../../const';
import {genreChange, incFilmListLength, resetApp} from '../../store/action';
import {fetchFilmList, fetchPromoFilm, postFavoriteFilm} from '../../store/api-action';
import UserBlock from '../user-block/user-block';

import {toast} from 'react-toastify';

const MainPage = () => {
  const {isDataLoaded, promoFilm} = useSelector((state) => state.DATA);
  const {activeGenre, filmListLength} = useSelector((state) => state.PROCESS);
  const {authorizationStatus, userData} = useSelector((state) => state.USER);

  const genresList = useSelector(getGenresList);
  const activeFilmList = useSelector(getActiveFilmList);

  const history = useHistory();
  const dispatch = useDispatch();

  const onGenreChange = (genre) => {
    dispatch(genreChange(genre));
  };

  const onShowMoreButtonClick = () => {
    dispatch(incFilmListLength(CARDS_SHOW_PER_STEP));
  };

  const onAddMyListButtonClick = () => {
    if (authorizationStatus === AuthorizationStatus.AUTH) {
      const filmId = promoFilm.id;
      const status = Number(true);

      dispatch(postFavoriteFilm(filmId, status))
      .then(() => {
        history.push(AppRoute.MYLIST);
      });
    } else {
      history.push(AppRoute.SINGIN);
    }
  };

  const appReset = () => {
    dispatch(resetApp());
  };

  useEffect(() => {
    dispatch(fetchPromoFilm());
  }, []);

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchFilmList())
        .catch(() => {
          toast(`Loading error`);
        });
    }
  }, [isDataLoaded]);

  if (!isDataLoaded) {
    return (
      <LoadingPage />
    );
  }

  return (
    <>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <Link className="logo__link" to={AppRoute.MAIN} onClick={appReset}>
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <UserBlock authorizationStatus={authorizationStatus} userData={userData} />
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={promoFilm.posterImage} alt={`${promoFilm.name} poster`} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{promoFilm.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{promoFilm.genre}</span>
                <span className="movie-card__year">{promoFilm.released}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button"
                  onClick={() => {
                    history.push(`/player/${promoFilm.id}`);
                  }}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button" onClick={onAddMyListButtonClick}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList genresList={genresList} activeGenre={activeGenre} onClick={onGenreChange} />

          <FilmCardsList films={activeFilmList.slice(0, filmListLength)} />

          <div className="catalog__more">
            {
              activeFilmList.length > filmListLength &&
              <button className="catalog__button" type="button" onClick={onShowMoreButtonClick}>Show more</button>
            }
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to={AppRoute.MAIN} className="logo__link logo__link--light" onClick={appReset}>
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
    </>
  );
};

export default MainPage;
