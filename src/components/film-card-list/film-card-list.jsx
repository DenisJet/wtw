import React, {useState} from "react";

import FilmCard from "../film-card/film-card";

import PropTypes from "prop-types";
import {FilmTypes} from "../../prop-types/film-types";

const FilmCardsList = ({films}) => {
  const [activeFilmCard, setActiveFilmCard] = useState(null);

  const handleMouseEnter = (film) => {
    setActiveFilmCard(film);
  };

  const handleMouseLeave = () => {
    setActiveFilmCard(null);
  };

  const isPlaying = (film) => {
    if (activeFilmCard) {
      return film.id === activeFilmCard.id;
    }

    return false;
  };

  return (
    <div className="catalog__movies-list">
      {films.map((film) => {
        return <FilmCard key={film.id}
          film={film}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          isPlaying={isPlaying(film)} />;
      })}
    </div>
  );
};

FilmCardsList.propTypes = {
  films: PropTypes.arrayOf(FilmTypes).isRequired,
};

export default FilmCardsList;
