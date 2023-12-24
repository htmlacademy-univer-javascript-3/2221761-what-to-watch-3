import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '.';
import { fetchFilmAction } from '../store/api-actions';
import { getCurrentFilm } from '../store/film-data/selectors';

export default function useFilmById() {
  const {id} = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmAction({filmId: id}));
    }
  }, [dispatch, id]);

  return useAppSelector(getCurrentFilm);
}
