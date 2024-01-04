import { describe, it } from 'vitest';
import { getFilmRating } from './get-film-rating';

describe('getFilmRating', () => {
  it('should return "Bad" for a rating less than 3', () => {
    const rating = 2;
    const result = getFilmRating(rating);
    expect(result).toBe('Bad');
  });

  it('should return "Normal" for a rating between 3 and 4', () => {
    const rating = 3.5;
    const result = getFilmRating(rating);
    expect(result).toBe('Normal');
  });

  it('should return "Good" for a rating between 5 and 7', () => {
    const rating = 6;
    const result = getFilmRating(rating);
    expect(result).toBe('Good');
  });

  it('should return "Very Good" for a rating between 8 and 9', () => {
    const rating = 8.5;
    const result = getFilmRating(rating);
    expect(result).toBe('Very Good');
  });

  it('should return "Awesome" for a rating of 10 or higher', () => {
    const rating = 10;
    const result = getFilmRating(rating);
    expect(result).toBe('Awesome');
  });
});
