import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '.';
import { getCurrentFilm } from '../store/film-data/selectors/selectors.ts';
import {fetchFilmAction} from '../store/film-data/api-action/api-action.ts';

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
