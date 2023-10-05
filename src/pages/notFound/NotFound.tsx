import React from 'react';
import {Link} from 'react-router-dom';

const NotFound: React.FC = () => (
  <div>
    <div>404 Not Found</div>
    <Link to="/">Вернуться на главную страницу</Link>
  </div>
);

export default NotFound;
