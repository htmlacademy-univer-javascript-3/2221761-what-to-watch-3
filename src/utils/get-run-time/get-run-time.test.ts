import { describe, it } from 'vitest';
import { getRunTime } from './get-run-time';

describe('getRunTime', () => {
  it('should return the run time in hours and minutes', () => {
    const runTime = 135;
    const result = getRunTime(runTime);
    expect(result).toEqual('2h 15m');
  });

  it('should handle run time with only minutes', () => {
    const runTime = 30;
    const result = getRunTime(runTime);
    expect(result).toEqual('0h 30m');
  });

  it('should handle run time with only hours', () => {
    const runTime = 180;
    const result = getRunTime(runTime);
    expect(result).toEqual('3h 0m');
  });

  it('should handle run time of 0', () => {
    const runTime = 0;
    const result = getRunTime(runTime);
    expect(result).toEqual('0h 0m');
  });
});
