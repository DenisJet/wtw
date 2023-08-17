import React from 'react';

import PropTypes from 'prop-types';
import {FilmTypes} from "../../../prop-types/film-types";

const OverViewTab = ({film, isActive}) => {
  const getRatingLevel = () => {
    let ratingLevel = ``;

    if (film.rating < 3) {
      ratingLevel = `Bad`;
    } else if (film.rating >= 3 && film.rating < 5) {
      ratingLevel = `Normal`;
    } else if (film.rating >= 5 && film.rating < 8) {
      ratingLevel = `Good`;
    } else if (film.rating >= 8 && film.rating < 10) {
      ratingLevel = `Very good`;
    } else {
      ratingLevel = `Awesome`;
    }

    return ratingLevel;
  };

  return (
    isActive &&
      <>
        <div className="movie-rating">
          <div className="movie-rating__score">{film.rating}</div>
          <p className="movie-rating__meta">
            <span className="movie-rating__level">{getRatingLevel()}</span>
            <span className="movie-rating__count">{film.scoresCount}</span>
          </p>
        </div>
        <div className="movie-card__text">
          <p>{film.description}</p>

          <p className="movie-card__director">
            <strong>Director: {film.director}</strong>
          </p>

          <p className="movie-card__starring">
            <strong>
            Starring: {film.starring} and
            other
            </strong>
          </p>
        </div>
      </>
  );
};

OverViewTab.propTypes = {
  film: FilmTypes.isRequired,
  isActive: PropTypes.bool,
};

export default OverViewTab;
