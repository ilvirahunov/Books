
export default (arr, searchV) => {                               // ф-я поиска по названию или автору
  return arr.filter(books => {
    return books.data.title.toLowerCase().includes(searchV) ||  books.data.author.toLowerCase().includes(searchV);
  });

}





