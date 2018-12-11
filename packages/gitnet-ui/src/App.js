import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import foo from "../node_modules/gitnet-js/dist/main.js";
import * as data from "./test.toml"
import whats from "./test.toml"
import * as bar from "./foo.json"

class App extends Component {
  render() {
  console.log("HIHIHI", foo());
  console.log("HIHIHI", data);
  console.log("HIHIHI", whats);
  console.log("HIHIHI", bar);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
