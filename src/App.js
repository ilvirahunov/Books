import React, {Component} from 'react';
import {Link, Switch, Route, Redirect, withRouter} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Profile from './Profile';
import Favorites from './Favorites';
import Home from './Home';
import RouteError from './RouteError';
import {getBooks} from "./actions/books";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import './style/app.css';

class App extends Component {

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    serverFail: PropTypes.bool.isRequired,
    isAutorized: PropTypes.bool.isRequired,
    getBooks: PropTypes.func.isRequired,
    books: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      checked: PropTypes.string.isRequired,
      favorites: PropTypes.string.isRequired,
      data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired
    })).isRequired
  };

  render() {
    const {books, isLoading, serverFail, getBooks, isAutorized} = this.props;

    return (
      <div className = 'karkas' >
        <header className = 'header'>
          <Link to = '/' className = 'headerLink'> Главная </Link>
          <Link to = '/favorites' className = 'headerLink'> Избранное </Link>
          <Link to = '/profile' className = 'headerLink'> Профиль </Link>
        </header>
        <>
          <Switch>
            <Route                                        // При передаче всех props-ов из App происходит сильное
              path = '/'                                  // его загромождение. Поэтому в остальных компонентах
              exact                                       // все props-ы кроме isAutorized
              render = {                                  // получу из connect на месте
                () => <Home
                  books = {books}
                  getBooks = {getBooks}
                  isLoading = {isLoading}
                  serverFail = {serverFail}
                />
              }
            />
            <PrivateRoute path = '/favorites' component = {Favorites} isAutorized = {isAutorized}/>
            <Route path = '/profile' render = {() => <Profile isAutorized = {isAutorized}/>}/>
            <Route path = '/error' component = {RouteError} />
            <Redirect from = '*' to = '/error'/>
          </Switch>
        </>
      </div>
    )
  }
}

const mapStateToProps  = (state) => ({
  books: state.books.booksData,
  isLoading: state.books.isLoading,
  serverFail: state.books.serverFail,
  isAutorized: state.autorize.isAutorized,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getBooks: () => dispatch( getBooks() ),
  }
};

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(App) );