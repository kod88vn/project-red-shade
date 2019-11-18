export const books = (state = [], action) => {
    switch (action.type) {
      case 'ADD_BOOKS':
        return action.books;
      case 'CLEAR_BOOKS':
        return [];
      default:
        return state;
    }
  };
