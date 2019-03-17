import React, { Component } from 'react';
import './App.css';
import Calendar from 'react-calendar';
import Form from './Form.js';

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state =
    {
      today: new Date(),
      notes: []
    };

    this.addNote = this.addNote.bind(this);
  }

  onChange()
  {
    this.setState({})
  }

  onClickDay(value)
  {
    this.setState({today:value});
  }

  addNote()
  {
    alert('add note');
  }

  render() {
    const noteContent =
      <button onClick={this.addNote}> Add Note </button>;

    return (
      <div>
        <Calendar
          onChange={()=>this.onChange()}
          onClickDay={(value)=>this.onClickDay(value)}
          value={this.state.today}
          />
        <div>{noteContent}</div>

      </div>
    );
  }
}

export default App;
