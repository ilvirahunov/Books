import {LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCEESS, SERVER_FAIL, LOGOUT} from '../actions/autorize';

const initialState = {
  isLoading: false,
  isAutorized: false,
  id: {},
  auturizeFail: false,
  serverFail: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: return {
      ...state,
      isLoading: true,
      auturizeFail: false,
      serverFail: false,
    };
    case LOGIN_SUCCEESS: return {
      ...state,
      isLoading: false,
      auturizeFail: false,
      isAutorized: true,
      serverFail: false,
      id: action.payload,
    };
    case LOGIN_FAIL: return {
      ...state,
      isLoading: false,
      auturizeFail: true,
      serverFail: false,
    };
    case SERVER_FAIL: return{
      ...state,
      isLoading: false,
      auturizeFail: false,
      serverFail: true,
    };
    case LOGOUT: return{
      ...state,
      isAutorized: false,
    };
    default: return {
      ...state,
    };
  }
};