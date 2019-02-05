import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import searcher from './helpers/search';
import './style/home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
  }
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
    const {search} = this.state;
    let shownBooks = [];
    if(search){                                        //если в поиске что - то  набрали, то происходит поиск с помощью спец функции
      shownBooks = [...searcher(books, search)]    // она принимает массив и выражение которое ищем и возврощает массив
    } else {                                            // содержащий элементы содержащте искомое выражение
      shownBooks = [...books];
    }
    const booksList = shownBooks.map( (book) =>
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
            <>
              Поиск
              <input
                name = 'search'
                type = 'text'
                value = {this.state.search}
                placeholder = 'Название книги или автора'
                onChange = {this.handleChange}
              />
              {booksList}
            </>
          )
        )}
      </>
    )
  }
  handleChange = (ev) => {
    this.setState({
      search: ev.target.value
    })
  }
}

