import React from 'react';
import { BookStore } from '/components/bookstore';

import './bookstore-page.scss';

export const BookstorePage = () => {
  return <div className="bookstore-page">
    <BookStore />
  </div>;
}
