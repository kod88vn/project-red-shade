import 'babel-polyfill';

const url = `/api/books`;

export const addBooks = books => ({
  type: 'ADD_BOOKS',
  books,
});

export const clearBooks = () => ({ type: 'CLEAR_BOOKS' });

export const getBooks = (searchText = '', page = 0, size = 20) => async dispatch => {
  try {
    const response = await fetch(url + `?page=${page}&size=${size}&searchText=${searchText}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      dispatch(clearBooks());
      return;
    }

    const responseBody = await response.json();
    dispatch(addBooks(responseBody));
  } catch (error) {
    console.error(error);
    dispatch(clearBooks());
  }
};

export const addBook = book => async dispatch => {
  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    });
    dispatch(getBooks());
  } catch (error) {
    console.error(error);
    dispatch(clearBooks());
  }
};

export const updateBook = book => async dispatch => {
  try {
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    });
    dispatch(getBooks());
  } catch (error) {
    console.error(error);
    dispatch(clearBooks());
  }
};

export const deleteBook = id => async dispatch => {
  try {
    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id})
    });

    dispatch(getBooks());
  } catch (error) {
    console.error(error);
    dispatch(getBooks());
  }
};
