import React, {useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import {AppRoute} from '../../const';

import AddReviewForm from "../add-review-form/add-review-form";
import {fetchFilm} from "../../store/api-action";
import UserBlock from "../user-block/user-block";

const AddReviewPage = () => {
  const {film} = useSelector((state) => state.DATA);
  const {userData, authorizationStatus} = useSelector((state) => state.USER);

  const dispatch = useDispatch();
  const id = Number(useParams().id);

  useEffect(() => {
    dispatch(fetchFilm(id));
  }, [id]);

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img
            src={film.previewImage}
            alt={film.name}
          />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to={AppRoute.MAIN} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${film.id}`} className="breadcrumbs__link">
                  {film.name}
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock authorizationStatus={authorizationStatus} userData={userData} />
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img
            src={film.previewImage}
            alt={`${film.name} poster`}
            width="218"
            height="327"
          />
        </div>
      </div>

      <div className="add-review">
        <AddReviewForm filmId={id} />
      </div>
    </section>
  );
};

export default AddReviewPage;
