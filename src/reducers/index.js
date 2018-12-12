import {combineReducers} from 'redux';
import autorize from './autorize';
import userInfo from './userInfo';
import books from './books';

export default combineReducers({
  autorize,
  userInfo,
  books,
});