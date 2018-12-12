import {BOOKS_REQUEST, BOOKS_SUCCEESS, GET_BOOKS_FAIL} from '../actions/books';

const initialState = {
  isLoading: false,
  booksData: [],
  serverFail: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BOOKS_REQUEST: return {...state, isLoading: true,};
    case BOOKS_SUCCEESS: return {...state, isLoading: false, serverFail: false, booksData: action.payload,};
    case GET_BOOKS_FAIL: return {...state, isLoading: false, serverFail: true,};
    default: return {...state, };
  }
}