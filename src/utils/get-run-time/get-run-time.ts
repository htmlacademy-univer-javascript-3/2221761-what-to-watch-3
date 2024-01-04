import {HOUR_MINUTES_COUNT} from '../../const.ts';

export const getRunTime = (runTime: number) => {
  const hours = Math.floor(runTime / HOUR_MINUTES_COUNT);
  const minutes = runTime % HOUR_MINUTES_COUNT;
  return `${hours}h ${minutes}m`;
};
