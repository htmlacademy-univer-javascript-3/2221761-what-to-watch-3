import {FC} from 'react';
import classes from './spinner.module.css';

export const Spinner: FC = () => (
  <div className={classes.spinner_container}>
    <div className={classes.spinner} data-testid='spinner'></div>
  </div>
);
