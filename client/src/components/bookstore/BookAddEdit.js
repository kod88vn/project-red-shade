import React, { useState } from 'react';
import { Form , Button } from 'react-bootstrap';

const BookAddEdit = ({ selected, addBook, updateBook, closeModal }) => {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  const id = selected ? selected.id : null;

  let newBook = id ? {
    id,
    name: !name ? selected.name : name || '',
    description: !description ? selected.description : description || '',
    author: !author ? (selected.author ? selected.author.name : author || '') : author
  } : {
    name: name,
    description: description,
    author: author
  };

  const handleSubmit = () => {
    if (id) {
      updateBook(newBook);
      closeModal();
    } else {
      addBook(newBook);
      closeModal();
    }
  }

  return (
    <React.Fragment>
      <View {...{ book: newBook, addBook, updateBook, closeModal, handleSubmit, setName, setAuthor, setDescription }} />
    </React.Fragment>
  )
};

const View = ({ book, closeModal, handleSubmit, setName, setAuthor, setDescription }) => (
  <div className="row">
    <Form className="book-add-edit">
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Book Name</Form.Label>
        <Form.Control type="text" placeholder="Name" onChange={event => setName(event.target.value)} value={book.name || ''} />
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Description" onChange={event => setDescription(event.target.value)} value={book.description || ''} />
        <Form.Label>Author</Form.Label>
        <div className="input-suggestion">
          <Form.Control type="text" placeholder="Author" onChange={event => setAuthor(event.target.value)} value={book.author || ''} />
          {/* <span className="suggestion">Jay Quach</span> */}
        </div>
      </Form.Group>
      <Button variant="primary" className="pull-right" disabled={!book.name || !book.author} onClick={() => handleSubmit() && closeModal()}>
        Save
      </Button>
    </Form>
  </div>
);

export default BookAddEdit;
