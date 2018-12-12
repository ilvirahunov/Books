import React from "react";
import PrivateUserInfo from './PrivateUserInfo';
import AutorizeForm from './AutorizeForm';
import PropTypes from 'prop-types';

const Profile = (props) => {

  Profile.propTypes = {
    isAutorized: PropTypes.bool.isRequired,
  };

  const isAutorized = props.isAutorized;

  return isAutorized ? (
    <PrivateUserInfo/>                       // в зависимости от авторизованности отображаем либо информацию
  ) : (                                      //  о пользователе либо страницу входа
    <AutorizeForm/>
  )
};

export default Profile;