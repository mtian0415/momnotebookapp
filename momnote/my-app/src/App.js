import React, { Component } from 'react';
import Calendar from 'react-calendar';
import './App.css';

class App extends Component {
  state = {
    date: new Date(),
  }
  onChange = date => this.setState({date})
  render() {
    return (
      <div>
        <Calendar
          onChange = {this.onchange}
          value = {this.state.date}
        />
      </div>
    );
  }
}

export default App;
