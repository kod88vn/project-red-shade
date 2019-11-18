import React from 'react';
import { Jumbotron , Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './main-page.scss';

export const MainPage = () => {
  return (
    <div className="main-page">
      <Jumbotron fluid>
        <h1>Project Red Shade!</h1>
        <p>
          Basically a test bed for my other project. While I'm building out an infrastructure for my future app I need to find out at every step if it actually works
        </p>
        <p>
          On the next tab is the dummy app. It immitates a boostore with some function.
          The idea is to dump a lot of data in the data base and see how fast the page can load.
          All the while, having a little extra fun for myself :)
        </p>
        <p>
          <Link className="btn btn-primary" to="/bookstore">Bookstore</Link>
        </p>
      </Jumbotron>
      <div className="sky">
        <div className="shooting-star" />
        <div className="shooting-star" />
        <div className="shooting-star" />
        <div className="shooting-star" />
        <div className="shooting-star" />
      </div>
    </div>
  );
}
