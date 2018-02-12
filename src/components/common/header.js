// header.js

import React from 'react';
import {Link, NavLink  } from 'react-router-dom';

const Header = () => {
  return(
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <a className="navbar-brand" href="https://www.linkedin.com/in/harkulwant/" target="_blank">
          Harkulwant
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home<span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#palindromeitems">Palindromes<span className="sr-only">(current)</span></a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;