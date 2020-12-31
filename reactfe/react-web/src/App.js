import React, { Component } from 'react';
import Login from './modules/login/login';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Home from './modules/login/Home';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Login}/>
        <Route path="/home" component={Home}/>
      </Router>
    );
  }
}

export default App;
