import React, { Component } from 'react';
import Students from "./components/Students";
import 'antd/dist/antd.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div data-testid="app" className="App">
        <Students/>
      </div>
    );
  }
}

export default App;
