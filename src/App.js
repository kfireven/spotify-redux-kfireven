import React, { useEffect } from "react";
import { requestSpotifyAuthorizationAPI } from './app/apis';
import { useDispatch } from "react-redux";

import logo from './logo.png';
import { Navbar } from 'react-bootstrap';
import './App.scss';

function App(props) {

  const dispatch = useDispatch();

  useEffect(() => {
    requestSpotifyAuthorizationAPI();
}, []);

  return (
    <div className="App">
      <Navbar className="Navbar">
        <Navbar.Brand>
          <img
            src={logo}
            width="145px"
            height="30px"
          />
        </Navbar.Brand>
      </Navbar>
      { props.children }
    </div>
  );
}

export default App;
