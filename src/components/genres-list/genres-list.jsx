import React from 'react';
import PropTypes from 'prop-types';

const GenresList = ({genresList, activeGenre, onClick}) => {
  return (
    <ul className="catalog__genres-list">
      {genresList && genresList.map((genre) => {
        return (
          <li key={genre} className={activeGenre === genre ? `catalog__genres-item catalog__genres-item--active` : `catalog__genres-item`}>
            <a type="button" className="catalog__genres-link" onClick={() => onClick(genre)}>{genre}</a>
          </li>
        );
      })}
    </ul>
  );
};

GenresList.propTypes = {
  genresList: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeGenre: PropTypes.string,
  onClick: PropTypes.func,
};

export default GenresList;
