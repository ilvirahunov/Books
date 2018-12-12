export const BOOKS_REQUEST = 'BOOKS_REQUEST';
export const BOOKS_SUCCEESS = 'BOOKS_SUCCEESS';
export const GET_BOOKS_FAIL = 'GET_BOOKS_FAIL';

export const booksRequest = () => ({
  type: BOOKS_REQUEST,
});
export const booksSucceess = (payload) => ({
  type: BOOKS_SUCCEESS,
  payload: payload,
});
export const getBooksFail = () => ({
  type: GET_BOOKS_FAIL,
});

export const getBooks = () => {
  return (dispatch) => {
    dispatch( booksRequest() );
    fetch(`./serverData/books.json`)
    .then(function (response) {
      return response.json();
    })
    .then(responseData => {
      dispatch( booksSucceess(responseData) );
    })
    .catch( () => {
      dispatch( getBooksFail() );
    });
  }
};