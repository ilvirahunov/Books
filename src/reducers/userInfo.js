import {USER_REQUEST, USER_SUCCEESS, GET_USER_DATA_FAIL} from '../actions/userInfo';

const initialState = {
  isLoading: false,
  userData: {},
  serverFail: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST: return {...state, isLoading: true,};
    case USER_SUCCEESS: return {...state, isLoading: false, serverFail: false, userData: action.payload,};
    case GET_USER_DATA_FAIL: return {...state, isLoading: false, serverFail: true,};
    default: return {...state, } ;
  }
}