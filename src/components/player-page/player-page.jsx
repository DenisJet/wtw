import React, {useRef, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';

import VideoPlayer from '../video-player/video-player';

import {fetchFilm, fetchPromoFilm} from '../../store/api-action';

const PlayerPage = () => {
  const {film, promoFilm} = useSelector((state) => state.DATA);

  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const filmId = film.id;
  const currentFilm = filmId ? film : promoFilm;
  const isPlaying = true;

  const buttonExitHandler = () => filmId ? history.push(`/films/${filmId}`) : history.push(`/`);

  useEffect(() => {
    if (filmId) {
      dispatch(fetchFilm(filmId));
    } if (promoFilm) {
      dispatch(fetchPromoFilm());
    }
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const timeout = setTimeout(() => {
        playerRef.current.play();
      }, 1000);

      return () => clearTimeout(timeout);
    }

    playerRef.current.pause();
    playerRef.current.load();
  }, [isPlaying]);

  return (
    <div className="player">
      <VideoPlayer
        ref={playerRef}
        isMuted={false}
        isControls={true}
        src={currentFilm.videoLink}
        className={`player__video`}
        poster={currentFilm.posterImage} />

      <button
        type="button"
        className="player__exit"
        onClick={() => {
          buttonExitHandler();
        }}
      >Exit</button>
    </div>
  );
};

export default PlayerPage;
