import React, {useRef, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import VideoPlayer from '../video-player/video-player';

import PropTypes from "prop-types";
import {FilmTypes} from '../../prop-types/film-types';
import {Link} from 'react-router-dom';
import {resetApp} from '../../store/action';

const FilmCard = ({film, onMouseEnter, onMouseLeave, isPlaying}) => {
  const dispatch = useDispatch();
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current === null) {
      return;
    }

    if (isPlaying) {
      const timeout = setTimeout(() => {
        playerRef.current.play();
      }, 1000);

      return () => clearTimeout(timeout);
    }

    if (!isPlaying) {
      playerRef.current.pause();
      playerRef.current.load();
    }

  }, [isPlaying]);

  const appReset = () => {
    dispatch(resetApp());
  };

  return (
    <article className="small-movie-card catalog__movies-card"
      onMouseEnter={(evt) => onMouseEnter(film, evt)}
      onMouseLeave={(evt) => onMouseLeave(evt)}>
      <Link to={`/films/${film.id}`} onClick={appReset}>
        <VideoPlayer
          ref={playerRef}
          src={film.previewVideoLink}
          posterSrc={film.previewImage}
          isMuted={true}
          className={`small-movie-card__image`} />
      </Link>
      <h3 className="small-movie-card__title">
        <Link className="small-movie-card__link" to={`/films/${film.id}`} onClick={appReset}>{film.name}</Link>
      </h3>
    </article>
  );
};

FilmCard.propTypes = {
  film: FilmTypes.isRequired,
  isPlaying: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export default FilmCard;
