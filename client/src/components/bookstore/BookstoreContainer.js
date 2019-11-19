
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, FormControl, Modal, Button } from 'react-bootstrap';

import * as actions from '/actions';
import Books from './Books';
import BookAddEdit from './BookAddEdit';
import './bookstore.scss';

class BookstoreContainer extends Component {
  state = {
    showModal: false,
    selected: {}
  };

  componentDidMount() {
    this.props.getBooks();
  }

  handleChange(val) {
    this.props.getBooks(val);
  }

  openModal() {
    this.setState({
      showModal: true
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
      selected: {}
    });
  }

  onRowClick(book) {
    this.setState({selected: book});
    this.openModal();
  }

  render() {
    const { bookData, deleteBook } = this.props;
    const { showModal, selected } = this.state;

    // if(!bookData || !bookData.list) {
    //   return <div>No books was found</div>
    // }

    const { list=[], ...rest } = bookData;

    return (
      <div className="bookstore-container">
        <div className="search-bar">
          <FormControl type="search" className="search form-control" placeholder="Search..." onChange={(event) => this.handleChange(event.target.value)}/>
          <Button className="add cursor-pointer" onClick={() => this.openModal()}>Add More</Button>
        </div>
        <hr />
        {(!bookData || !bookData.list) ? (<Books {...{ books: list, ...rest, deleteBook, onRowClick: (b) => this.onRowClick(b) }}/>) : null }
        <hr />
        <Modal show={showModal} onHide={() => this.closeModal()}>
          <Modal.Body>
            <BookAddEdit {...{ selected, closeModal: () => this.closeModal(), ...this.props}} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { bookData: state.bookData }
};
const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(BookstoreContainer);
