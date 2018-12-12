export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCEESS = 'USER_SUCCEESS';
export const GET_USER_DATA_FAIL = 'GET_USER_DATA_FAIL';

export const userRequest = () => ({
  type: USER_REQUEST,
});
export const userSucceess = (payload) => ({
  type: USER_SUCCEESS,
  payload: payload,
});
export const getUserDataFail = () => ({
  type: GET_USER_DATA_FAIL,
});

export const getUserInfo = (profileId) => {
  let id = profileId;
  return (dispatch) => {
    dispatch( userRequest() );
    fetch(`./serverData/user${id}Data.json`)                       //Имитация запроса данных конкретного пользователя
    .then(function (response) {
      return response.json();
    })
    .then(responseData => {
      dispatch(userSucceess( responseData.data) );
    })
    .catch( () => {
      dispatch( getUserDataFail() );
    });
  }
};