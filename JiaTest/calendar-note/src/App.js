import React, { Component } from "react";
import "./App.css";
import Calendar from "react-calendar";
import Note from "./Note.js";

class App extends Component {
  constructor(props) {
    super(props);

    let today = new Date();
    today.setHours(0,0,0,0);

    this.state = {
      today: today,
      notes: []
    };

    this.addNote = this.addNote.bind(this);
    this.onClickDay = this.onClickDay.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }

  componentDidMount() {
    let notes = localStorage.getItem("notes");
    if (notes) 
    {
      let jsonNotes = JSON.parse(notes);
      for (let i = 0; i < jsonNotes.length; ++i)
      {
        // JSON format parsed date is not the same with the Date class
        jsonNotes[i].date = new Date(jsonNotes[i].date);
      }
      this.setState({ notes: jsonNotes });
    }
  }

  onClickDay(value) {
    this.setState({ today: value });
  }

  addNote() {
    let notes = [{ date: this.state.today, title: "", text: "" }].concat(
      this.state.notes
    );
    this.saveNote(notes);
  }

  removeNote() {}

  updateNote(index, title, text) {
    //prepend new object
    let notes = this.state.notes.slice();
    let note = notes[index];
    note.title = title;
    note.text = text;

    this.saveNote(notes);
  }

  findNoteOfDayIndex(notes, day) {
    for (let i = 0; i < notes.length; i++) {
      let note = notes[i];
      if (note.date.getTime() === day.getTime()) {
        return i;
      }
    }

    return -1;
  }

  saveNote(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
    this.setState({ notes: notes });
  }

  render() {
    let noteContent = <button onClick={this.addNote}> Add Note </button>;

    let foundIndex = this.findNoteOfDayIndex(
      this.state.notes,
      this.state.today
    );
    if (foundIndex !== -1) {
      let foundNote = this.state.notes[foundIndex];
      noteContent = (
        <Note
          key={foundIndex}
          index={foundIndex}
          title={foundNote.title}
          text={foundNote.text}
          onUpdate={this.updateNote}
          onRemove={this.removeNote}
        />
      );
    }

    return (
      <div>
        <Calendar onClickDay={this.onClickDay} value={this.state.today} />
        <div>{noteContent}</div>
      </div>
    );
  }
}

export default App;
