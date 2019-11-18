import React from 'react';
import { ListGroup } from 'react-bootstrap';

const Books = ({ books, total, matchCount, deleteBook, onRowClick }) => {
  return (
    <div className="book-list">
      <div className="clearfix"></div>
      <h5>There are totally {total} books in the store. Showing {books.length} matching</h5>
      <ListGroup>
        {books.map((b, index) => (
        <ListGroup.Item key={index}>
          <span className="cursor-pointer" onClick={() => onRowClick(b)}>{(b.author ? b.author.name : 'no author')} - {b.name}</span>
          <button type="button" className="close" aria-label="Close" onClick={() => deleteBook(b.id)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
)};

export default Books;
