import React from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import { MainPage, BookstorePage, AboutPage } from '/pages';

const Failed = () => 'Failed to render';

const App = () => (
  <React.Fragment>
    <header className="page-header">
      <NavLink to="/main" className="btn" activeClassName="active">Home</NavLink>
      <NavLink to="/bookstore" className="btn" activeClassName="active">Bookstore</NavLink>
      <NavLink to="/about" className="btn" activeClassName="active">About Me</NavLink>
    </header>
    <main className="page-content">
      <Switch>
        <Route exact path="/main" component={MainPage || Failed} />
        <Route exact path="/bookstore" component={BookstorePage || Failed} />
        <Route exact path="/bookstore" component={BookstorePage || Failed} />
        <Route exact path="/about" component={AboutPage || Failed} />
        <Redirect to="/main" />
      </Switch>
    </main>
    <footer className="page-footer">
      <p className="ribbon">
        <span className="ribbon-text">Brought To You By - <strong className="bold">Jay Quach</strong></span>
      </p>
    </footer>
  </React.Fragment>
);

export default App;
