import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import './style/home.css';

export default class Home extends Component {

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    serverFail: PropTypes.bool.isRequired,
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

  componentDidMount() {
    this.props.getBooks();
  }

  render() {
    const {isLoading, serverFail, books} = this.props;
    const booksList = books.map( (book) =>
      <Fragment key = {book.id}>
        <h3 className = 'title'> {book.data.title} </h3>
        <p className = 'author'>{book.data.author}</p>
        <p className = 'description'> {book.data.description}</p>
        <a className = 'link' href = {book.data.link} target = '_blank' rel="noreferrer noopener" > Смотреть подробнее </a>
      </Fragment>                                          //добавил защиту от уязвимости
      );

    return (
      <>
        <h2> Книги рекомендованные редакцией </h2>
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
            booksList
          )
        )}
      </>
    );
  }
}

