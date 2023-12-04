import {FC} from 'react';
import {Link} from 'react-router-dom';
import image from '../../assets/img/6325254.jpg';
import style from './NotFound.module.css';

export const NotFound: FC = () => (
  <div>
    <div className={style.container}>
      <img src={image} className={style.image}/>
    </div>
    <div className={style.container__text}>
      <div className={style.text}>Похоже что такой страницы нет...</div>
      <Link to="/" className={style.link}>Вернуться на главную страницу</Link>
    </div>
  </div>
);
