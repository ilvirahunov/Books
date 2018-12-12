import React, {Component} from "react";
import {logout} from "./actions/autorize";
import {getUserInfo} from "./actions/userInfo";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import './style/privateUserInfo.css';

class PrivateUserInfo extends Component {

  static propTypes = {
    profileId: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    serverFail: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    getUserInfo: PropTypes.func.isRequired,
    userData: PropTypes.shape({
      name: PropTypes.string,
      surname: PropTypes.string,
      city: PropTypes.string,
      date: PropTypes.string,
      languages: PropTypes.string,
    }),
  };

  componentDidMount() {
    this.props.getUserInfo(this.props.profileId);
  };

  render() {
    const {userData, isLoading, serverFail} = this.props;

    return (
      <div className = 'userInfo'>
        {isLoading ? (
          <p className = 'error'>
            Загрузка
          </p>
        ) : (
          serverFail ? (
            <p className = 'error'>
              Ошибка сервера
            </p>
          ) : (
            <>
              <p> {userData.name} { } {userData.surname}</p>
              <p> Город проживания: {userData.city}</p>
              <p> Дата рождения: {userData.date} </p>
              <p> Знание языков: {userData.languages}</p>
              <button onClick = {this.props.logout}> Выйти </button>
            </>
          )
        )}
        </div>
    );
  }
}

const mapStateToProps  = (state) => ({
  profileId: state.autorize.id.id,
  userData: state.userInfo.userData,
  isLoading: state.userInfo.isLoading,
  serverFail: state.userInfo.serverFail,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch( logout() ),
    getUserInfo: (profileId) => dispatch( getUserInfo(profileId) ),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateUserInfo);