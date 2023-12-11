import {PreviewTypes} from '../models';

export const getFilmsGenre = (films: PreviewTypes[], targetGenre: string) => films.filter(({ genre }) => genre === targetGenre);
