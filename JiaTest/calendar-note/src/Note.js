import React, { Component } from "react";

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeText = this.changeText.bind(this);

    this.save = this.save.bind(this); //to the parent
    this.delete = this.delete.bind(this); //to the parent

    this.state = {
      title: this.props.title,
      text: this.props.text,
    }; //by default render as text
  }

  save() {
    //lift state up to the parent
    this.props.onUpdate(this.props.index, this.state.title, this.state.text);
    this.setState({ editing: !this.state.editing });
  }

  delete() {
    //lift state up to the parent
    this.props.onRemove(this.props.index);
  }

  changeTitle(e) {
    this.setState({ title: e.target.value });
  }

  changeText(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <div>
        <div>
          <span>Title</span>
          <button onClick={this.save}>Save</button>
          <button onClick={this.delete}>Delete</button>
        </div>

        <div>
          <input
            type="text"
            value={this.state.title}
            onChange={this.changeTitle}
          />
        </div>
        <div>
          <textarea
            name="text"
            value={this.state.text}
            onChange={this.changeText}
            rows="4"
          />
        </div>
      </div>
    );
  }
}

export default Note;
