import React from "react";
import {Link} from "react-router-dom";

import {AppRoute} from "../../const";

const NotFoundPage = () => {
  return (
    <>
      <h1>404. Page not found</h1>
      <Link to={AppRoute.MAIN}>Вернуться на главную</Link>
    </>
  );
};

export default NotFoundPage;
