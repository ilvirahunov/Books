import React from "react";
import {Link} from "react-router-dom";

const RouteError = () => {
  return <p> Запрашиваемая вами страница не найдена. <Link to = '/' >Нажмите</Link> для перехода на главную </p>
};

export default RouteError;