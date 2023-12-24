import { SECOND_COUNT_IN_HOUR, SECOND_COUNT_IN_MINUTE } from '../const';

export const getTimeLeft = (secondCount: number) => {
  const hours = Math.floor(secondCount / SECOND_COUNT_IN_HOUR);
  const minutes = Math.floor((secondCount % SECOND_COUNT_IN_HOUR) / SECOND_COUNT_IN_MINUTE);
  const seconds = Math.floor(secondCount % SECOND_COUNT_IN_MINUTE);

  if (hours > 0) {
    return `-${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `-${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
