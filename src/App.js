import React, { useEffect } from "react";

import logo from './logo.png';
import { Navbar } from 'react-bootstrap';
import './App.scss';

function App(props) {
  return (
    <div className="App">
      <Navbar className="Navbar">
        <Navbar.Brand>
          <img
            src={logo}
            width="165px"
            height="30px"
          />
        </Navbar.Brand>
      </Navbar>
      { props.children }
    </div>
  );
}

export default App;
