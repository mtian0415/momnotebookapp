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
      today: null,
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
    let notes = [{date: this.state.today, text: null}].concat(this.state.notes);
    this.saveNote(notes);
  }

  saveNote(notes) {
    //localStorage.setItem('notes', JSON.stringify(notes));
    this.setState({notes: notes});
  }

  render() {
    let noteContent =
      <button onClick={this.addNote}> Add Note </button>;

    for (let i = 0; i < this.state.notes.length; i++)
    {
      let note = this.state.notes[i];
      if (note.date == this.state.today)
      {
        alert("found");
        noteContent = <Form></Form>;
        break;
      }
    }

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
