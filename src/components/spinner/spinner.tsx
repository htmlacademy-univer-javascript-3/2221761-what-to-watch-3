import {FC} from 'react';
import classes from './Spinner.module.css';

export const Spinner: FC = () => (
  <div className={classes.spinner_container}>
    <div className={classes.spinner}></div>
  </div>
);
