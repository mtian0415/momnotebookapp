import React, { Component } from 'react';
import Calendar from 'react-calendar';
import './App.css';

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      today: null,
      notes:[],
    };
    this.clickDay = this.clickDay.bind(this);
    this.newNote = this.newNote.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }

  componentDidMount() {
    let notes = localStorage.getItem("notes");
      if (notes)
         this.setState({notes: JSON.parse(notes)});
  }   
  
  newNote()
  {
    let notes = [{date: this.state.today, title:"", text:""}].concat(this.state.notes);
    this.saveNote(notes);
  }

  saveNote(notes)
  {
    localStorage.setItem('notes',JSON.stringify(notes));
    this.setState({notes:notes});
  }

  updateNote(index, title, text) {
    let notes = this.state.notes;
    notes[index].title = title;
    notes[index].text = text;
    this.saveNote(notes);
  } 

  clickDay(value)
  {
    this.setState({today: value});
  }

  findNoteByDay(day)
  {
    
  }

  // onChange = date => this.setState({date})
  render(){

    let notes = <button onClick={this.newNote}>Add Note</button>;

    if (this.state.notes.length > 0)
    {
      notes = this.state.notes.map((obj, i) =>  
      <Note key={i} index={i} date = {obj.date} title={obj.title} text={obj.text} onUpdate={this.updateNote} onRemove={this.removeNote} />
      );   
    }else
    {
      
    }

    return (
      <div className="container-fluid">
        <div>
          <Calendar
            onChange = {this.onchange}
            onClickDay = {this.clickDay}
          />
    
          </div>
          <div className="container-fluid">  
                  {notes}         
          </div> 
      
      </div>
    )
  }
}

class Note extends React.Component {
  constructor(props) {
    super(props); 
    this.changeTitle = this.changeTitle.bind(this);
    this.changeText = this.changeText.bind(this);
    
    this.edit = this.edit.bind(this); //to the parent
    this.delete = this.delete.bind(this); //to the parent
    
    this.state = {title: this.props.title, text: this.props.text, editing: false}; //by default render as text
  }
      
  edit() { //lift state up to the parent 
    this.props.onUpdate(this.props.index, this.state.title, this.state.text);
    this.setState({editing: !this.state.editing});
  }
  
  delete() { //lift state up to the parent    
    this.props.onRemove(this.props.index);
  }
  
  changeTitle(e) {
    this.setState({title: e.target.value});
  }
  
  changeText(e) {
    this.setState({text: e.target.value});
  }
  render() { //when clicks edit button pencil-icon toggle between input and div
      return (<div className="inner">   
                <div className="title">
                     <span>Title</span>
                     <button type="button" className="btn del" onClick={this.delete}><i className="fa fa-trash"></i></button>  
                     <button type="button" className="btn save" onClick={this.edit}><i className="fa fa-floppy-o"></i></button>
                </div>
                          
                <div className="form-group">
                    <input type="text" value={this.state.title} onChange={this.changeTitle} className="form-control" />  
                </div>                    
                <div className="form-group">
                    <textarea  name="text" value={this.state.text} onChange={this.changeText} className="form-control" rows="4"/>
                </div>
          
             </div>)
    
  }
}
export default App;
