import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import {FC} from 'react';
import {VideoPlayer} from '../videoPlayer/VideoPlayer.tsx';

export type CardProps = {
  id: string;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  isPlayingPreviewVideo: boolean;
  onSmallFilmCardMouseOver: () => void;
  onSmallFilmCardMouseOut: () => void;
}

export const Card: FC<CardProps> = ({id, previewImage, name, previewVideoLink, isPlayingPreviewVideo, onSmallFilmCardMouseOver, onSmallFilmCardMouseOut}) => (
  <article
    className="small-film-card catalog__films-card"
    onMouseOver={onSmallFilmCardMouseOver}
    onMouseOut={onSmallFilmCardMouseOut}
  >
    <div className="small-film-card__image">
      <VideoPlayer
        isPlaying={isPlayingPreviewVideo}
        src={previewVideoLink}
        poster={previewImage}
      />
    </div>
    <h3 className="small-film-card__title">
      <Link className="small-film-card__link" to={`${AppRoute.Film}/${id}`}>{name}</Link>
    </h3>
  </article>
);
