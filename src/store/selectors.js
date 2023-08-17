import {createSelector} from '@reduxjs/toolkit';
import {NameSpace} from './root-reducer';
import {GENRES_LIST_MAX_LENGTH} from '../const';

const selectAllFilms = (state) => state[NameSpace.DATA].filmData;
const selectActiveFilm = (state) => state[NameSpace.DATA].film;
const selectActiveGenre = (state) => state[NameSpace.PROCESS].activeGenre;

const getGenresList = createSelector([selectAllFilms], (filmData) => {
  const genresList = [`All genres`];

  filmData.forEach((film) => {
    genresList.push(film.genre);
  });

  return [...new Set(genresList)].slice(0, GENRES_LIST_MAX_LENGTH);
});

const getActiveFilmList = createSelector([selectAllFilms, selectActiveGenre], (filmData, activeGenre) => {
  const activeFilmsList = [];

  if (activeGenre === `All genres`) {
    return filmData;
  } else {
    filmData.map((film) => {
      if (film.genre === activeGenre) {
        activeFilmsList.push(film);
      }
    });
  }

  return activeFilmsList;
});

const getLikeThisFilmList = createSelector([selectAllFilms, selectActiveFilm], (filmData, activeFilm) => {
  return filmData.filter((film) => (film.genre === activeFilm.genre) && (film.id !== activeFilm.id)).slice(0, 4);
});


export {getGenresList, getActiveFilmList, getLikeThisFilmList};
