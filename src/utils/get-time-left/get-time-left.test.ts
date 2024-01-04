import { describe, it } from 'vitest';
import { getTimeLeft } from './get-time-left';

describe('getTimeLeft', () => {
  it('should return the time left in the format -HH:MM:SS when hours are greater than 0', () => {
    const secondCount = 3725;
    const result = getTimeLeft(secondCount);
    expect(result).toEqual('-01:02:05');
  });

  it('should return the time left in the format -MM:SS when hours are 0', () => {
    const secondCount = 125;
    const result = getTimeLeft(secondCount);
    expect(result).toEqual('-02:05');
  });

  it('should handle single-digit hours, minutes, and seconds', () => {
    const secondCount = 3605;
    const result = getTimeLeft(secondCount);
    expect(result).toEqual('-01:00:05');
  });

  it('should handle time left with 0 hours', () => {
    const secondCount = 65;
    const result = getTimeLeft(secondCount);
    expect(result).toEqual('-01:05');
  });

  it('should handle time left with 0 hours, 0 minutes, and single-digit seconds', () => {
    const secondCount = 5;
    const result = getTimeLeft(secondCount);
    expect(result).toEqual('-00:05');
  });
});
