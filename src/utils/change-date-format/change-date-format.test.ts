import {getAltDate, humanizeDate} from './change-date-format.ts';

describe('changeDateFormat', () => {
  it('humanizeDate should return a human-readable date', () => {
    const date = '2022-01-01';
    const result = humanizeDate(date);
    expect(result).toBe('January 1, 2022');
  });

  it('getAltDate should return an alternative date format', () => {
    const date = '2022-01-01';
    const result = getAltDate(date);
    expect(result).toBe('2022-01-01');
  });
});
