import React, { Component } from 'react';
import {DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import connect from "react-redux/es/connect/connect";
import {getBooks} from "./actions/books";
import PropTypes from 'prop-types';
import './style/favorite.css';
//  DnD с применением react-beautiful-dnd
const reorder = (list, startIndex, endIndex) => {                  // a little function to help us with reordering the result
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const grid = 8;
                                                     // стили
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? 'lightgreen' : 'lightgrey',
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightblue',
  padding: grid,
  width: 400,
});

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.books.filter( (item) => (JSON.parse(item.favorites) === true) ),     //Из переданного в props массива книг
    }                                                                                        // отбираем с favorites - true
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

  static getDerivedStateFromProps(props, state){
    if (state.items.length > 0) {
      return null;
    }else {
      return state.items = props.books.filter( (item) => (JSON.parse(item.favorites) === true) );
    }
  };

  componentDidMount() {
    this.props.getBooks();
  }

  onDragEnd = (result) => {
    if (!result.destination) {                                // если отпустили за пределами области то возвр комп на место
      return;
    }

    const items = reorder(                                   // производим DnD
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({                                         // сохраняем изменения
      items,
    });
  };

  render() {
    const {isLoading, serverFail} = this.props;
    return (
      <div className = 'dnd'>
        <h2>Моя библиотека</h2>
        {isLoading ? (
          <p className = 'error'>
            Загрузка
          </p>
        ):(
          serverFail ? (
            <p className = 'error'>
              Ошибка сервера
            </p>
          ):(
            <DragDropContext onDragEnd = {this.onDragEnd} >
              <Droppable droppableId = "droppable">
                {(provided, snapshot) => (
                  <div
                    ref = {provided.innerRef}
                    style = {getListStyle(snapshot.isDraggingOver)}
                  >
                    {this.state.items.map( (item, index) => (
                      <Draggable key = {item.id} draggableId = {item.id} index = {index}>
                        {(provided, snapshot) => (
                          <div
                            ref = {provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style = {getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <p> <input type = "checkbox" defaultChecked = {JSON.parse(item.checked)}/>{item.data.title}</p>
                            <p>{item.data.author}</p>
                          </div>
                        )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                    </div>
                )}
                </Droppable>
            </DragDropContext>
          )
        )}
        </div>
    );
  }
}

const mapStateToProps  = (state) => ({
  books: state.books.booksData,
  isLoading: state.books.isLoading,
  serverFail: state.books.serverFail,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getBooks: () => dispatch( getBooks() ),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);



