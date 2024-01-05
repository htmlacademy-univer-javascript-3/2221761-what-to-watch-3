import { NameSpace } from '../../../const.ts';
import { State } from '../../../types';

export const getActiveGenre = (state: Pick<State, NameSpace.Genre>): string => state[NameSpace.Genre].genre;
