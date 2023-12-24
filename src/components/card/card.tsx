import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import {FC} from 'react';
import {VideoPlayer} from '../video-player/video-player.tsx';

export type SmallFilmCardProps = {
  id: string;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  isPlayingPreviewVideo: boolean;
  onSmallFilmCardMouseOver: () => void;
  onSmallFilmCardMouseOut: () => void;
}

export const Card: FC<SmallFilmCardProps> = ({id, previewImage, name, previewVideoLink, isPlayingPreviewVideo, onSmallFilmCardMouseOver, onSmallFilmCardMouseOut}) => (
  <article
    className="small-film-card catalog__films-card"
    onMouseOver={onSmallFilmCardMouseOver}
    onMouseOut={onSmallFilmCardMouseOut}
  >
    <Link className="small-film-card__link" to={`${AppRoute.FilmData}/${id}`}>
      <div className="small-film-card__image">
        <VideoPlayer
          isPlaying={isPlayingPreviewVideo}
          src={previewVideoLink}
          poster={previewImage}
        />
      </div>
      <h3 className="small-film-card__title">
        {name}
      </h3>
    </Link>
  </article>
);
