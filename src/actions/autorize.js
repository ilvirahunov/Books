export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCEESS = 'LOGIN_SUCCEESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const SERVER_FAIL = 'SERVER_FAIL';
export const LOGOUT = 'LOGOUT';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});
export const loginSucceess = (payload) => ({
  type: LOGIN_SUCCEESS,
  payload: payload,
});
export const loginFail = () => ({
  type: LOGIN_FAIL,
});
export const serverFail = () => ({
  type: SERVER_FAIL,
});
export const logout = () => ({
  type: LOGOUT,
});

export const loginUser = (email, password) => {
  let url = '';
  ( (email === 'test@mail.ru') && (password === '1234')  ) ? (            // имитация запроса на сервер. В зависимости от правильности
    url =  './serverData/succeess.json'                                   // данных входа назначаем разный url и получаем разный ответ
  ) : (
    url =  './serverData/fail.json'
  );
  return (dispatch) => {
    dispatch( loginRequest() );
    fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(responseData => {
      (responseData.status === 'ok') && dispatch( loginSucceess(responseData.data) );
      (responseData.status === 'error') && dispatch( loginFail() );
    })
    .catch( () => {
      dispatch( serverFail() )
    });
  }
};



