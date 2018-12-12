import React, {Component} from "react";
import {connect} from 'react-redux';
import {loginUser} from './actions/autorize';
import PropTypes from 'prop-types';
import './style/autorizeForm.css';

class AutorizeForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      errorSubmit: false,
      errorPrimaryEmail: false,
      errorPrimaryPassword: false,
    };
  }

  static propTypes = {
    auturizeFail: PropTypes.bool.isRequired,
    serverFail: PropTypes.bool.isRequired,
    loginUser: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  static getDerivedStateFromProps(props, state){                                //Если пришел fail ответ(т.е. нас не отправило
    if(props.auturizeFail || props.serverFail) {                                // на страницу профиля) то снимаем блокировку снопки
      document.getElementById('buttonLogin').removeAttribute('disabled');
      return null
    } else {
      return null
    }
  };

  render() {
    const {errorSubmit, errorPrimaryEmail, errorPrimaryPassword} = this.state;
    const {auturizeFail, serverFail, isLoading} = this.props;

    return (
      <div className = 'autorizeForm'>
        <h3> Для просмотра необходимо авторизоваться </h3>

        <form className = 'form' onSubmit = {this.handleSubmit} >
          <label>
            <p> Email:</p>
            <input
              name = 'email'
              placeholder = 'test@mail.ru'                                   //    логин для входа
              type = 'text'
              onBlur = {this.primaryValidate}/>                                  {/*вызов валидации по рег.выраж.*/}
          </label>
          <label>
            <p> Password:</p>
            <input
              name = 'password'
               placeholder = '1234'
              type = 'password'
              onBlur = {this.primaryValidate}                                   /*вызов валидации по длине пароля(не менее 4х символов)*/
              onChange = {this.handleUserChange}
            />
          </label>
          <button type = 'submit' id = 'buttonLogin'> {isLoading ? "Загрузка" : "Войти"} </button>
        </form>

        <div className = 'errorBox'>
          {errorPrimaryEmail&& <p className = 'error'> Неверный адрес электронной почты</p>}
          {errorPrimaryPassword && <p className = 'error'> Длина пароля должна быть не менее 4 символов</p>}
          {errorSubmit && <p className = 'error'> Заполните все поля формы</p>}
          {auturizeFail && <p className = 'error'> Имя пользователя или пароль введены не верно</p>}
          {serverFail && <p className = 'error'> Сервер не отвечает.Попробуйте зайти позже</p>}
        </div>

      </div>
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    email.length && password.length ? (                                              //производим валидацию по заполненности полей
      this.setState( {errorSubmit: false}, () => {
        this.validateAndRequest(email, password);
      })
    ) : (
      this.setState( {errorSubmit: true}, () => {
        this.validateAndRequest(email, password);
      })
    );
  };

  validateAndRequest = (email, password) => {                                     //при отсутствии ошибок валидации отправляем запрос
    const {errorSubmit, errorPrimaryEmail, errorPrimaryPassword} = this.state;
    if (!errorSubmit && !errorPrimaryEmail &&!errorPrimaryPassword) {
      this.buttonBlock();                                                        //блокировка кнопки во время запроса
      this.props.loginUser(email, password);
    }
  };

  buttonBlock = () => {
    document.getElementById('buttonLogin').setAttribute('disabled', 'disabled');
  };

  primaryValidate = (event) => {                                            //производим первичную валидацию( емеил-рег.вырб пароль - по длине)
    if ( event.target.name === 'email' && event.target.value.length > 0 ) {
      (event.target.value.match('[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]+') ? (
        this.setState( {errorPrimaryEmail: false} )
        ) : (
          this.setState( {errorPrimaryEmail: true} )
        )
      );
    } else if (event.target.name === 'password' && event.target.value.length > 0) {
      (event.target.value.length > 3) ? (
        this.setState( {errorPrimaryPassword: false} )
      ) : (
        this.setState( {errorPrimaryPassword: true} )
      );
    }
  };
}

const mapStateToProps  = (state) => ({
  auturizeFail: state.autorize.auturizeFail,
  serverFail: state.autorize.serverFail,
  isLoading: state.autorize.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (email, password) => dispatch( loginUser(email, password) )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AutorizeForm);