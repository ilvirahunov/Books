import React from 'react';
import {Route, Redirect} from 'react-router';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest}) => {

  PrivateRoute.propTypes = {
    isAutorized: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
  };

    const isAutorized = rest.isAutorized;

    return (
      <Route
        {...rest}
        render = { props =>
          isAutorized ? (                         // если пользователь авторизован - ренедерим переданный компонент,
            <Component {...props}/>               // если нет, то перенаправляем в страницу входа в профиль
          ) : (
            <Redirect to = '/profile'/>
          )
        }
      />
    )
};

export default PrivateRoute;
