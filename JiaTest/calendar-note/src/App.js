import React, { Component } from 'react';
import './App.css';
import Calendar from 'react-calendar';
import Note from './Note.js';

class App extends Component {
  state =
  {
    date: new Date(),
  }

  onChange()
  {
    this.setState({})
  }

  onClickDay(value)
  {
    alert('Day: ' + value);
  }

  render() {
    return (
      <div>
        <Calendar
          onChange={()=>this.onChange()}
          onClickDay={(value)=>this.onClickDay(value)}
          value={this.state.date}
          />
        <Note />

      </div>
    );
  }
}

export default App;
