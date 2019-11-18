import 'babel-polyfill';

const url = `/api/authors`;

export const addAuthors = authors => ({
  type: 'ADD_AUTHORS',
  authors,
});

export const clearAuthors = () => ({ type: 'CLEAR_AUTHORS' });

export const getAuthors = (searchText = '', page = 0, size = 20) => async dispatch => {
  try {
    const response = await fetch(url + `?page=${page}&size=${size}&searchText=${searchText}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      dispatch(clearAuthors());
      return;
    }

    const responseBody = await response.json();
    dispatch(addAuthors(responseBody));
  } catch (error) {
    console.error(error);
    dispatch(clearAuthors());
  }
};

export const addAuthor = author => async dispatch => {
  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(author)
    });
    dispatch(getAuthors());
  } catch (error) {
    console.error(error);
    dispatch(clearAuthors());
  }
};

export const updateAuthor = author => async dispatch => {
  try {
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(author)
    });
    dispatch(getAuthors());
  } catch (error) {
    console.error(error);
    dispatch(clearAuthors());
  }
};

export const deleteAuthor = id => async dispatch => {
  try {
    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id})
    });

    dispatch(getAuthors());
  } catch (error) {
    console.error(error);
    dispatch(getAuthors());
  }
};
