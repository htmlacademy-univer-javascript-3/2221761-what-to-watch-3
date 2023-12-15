import {FC} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {FilmsTypes} from '../../models';

type PlayerProps = {
  films: FilmsTypes[];
}

export const Player: FC<PlayerProps> = ({films}) => {
  const navigate = useNavigate();
  const {id} = useParams();
  const film = films.find((item) => item.id === id) as FilmsTypes;

  return (
    <div className="player">
      <video src={film.videoLink} className="player__video" poster={film.backgroundImage}></video>

      <button onClick={() => navigate(`${AppRoute.Film}/${film.id}`)} type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler">Toggler</div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
