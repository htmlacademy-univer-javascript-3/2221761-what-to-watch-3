import {FC} from 'react';
import {Link} from 'react-router-dom';
import image from '../../assets/img/6325254.jpg';
import classes from './not-found.module.css';

export const NotFound: FC = () => (
  <div>
    <div className={classes.container}>
      <img src={image} className={classes.image}/>
    </div>
    <div className={classes.container__text}>
      <div className={classes.text}>Похоже что такой страницы нет...</div>
      <Link to="/" className={classes.link}>Вернуться на главную страницу</Link>
    </div>
  </div>
);
