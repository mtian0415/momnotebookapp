import React, { Component } from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);    //controlled component, so it needs so many handlers
    this.changeTitle = this.changeTitle.bind(this);
    this.changeText = this.changeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.state = {title: '', text: ''};
  }

  changeTitle(e) {
    this.setState({title: e.target.value});
  }

  changeText(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) { //here is a "Lift state up" on the parent component
    this.props.onSend(this.state.title, this.state.text);
    this.handleCancel(e); //reset form text and cancel reload of the page
  }

  handleCancel(e) {
    this.setState({title: '', text: ''});
    e.preventDefault();
  }

  render() {
    return ( <form className="collapse" id="form">
                  <div className="form-group">
                     <label htmlFor="exampleInputEmail1">Title</label>
                     <input type="text" value={this.state.title} onChange={this.changeTitle}
                            className="form-control" placeholder="Enter title" />
                  </div>

                  <div className="form-group">
                     <textarea  name="text" value={this.state.text} onChange={this.changeText}
                                placeholder="Enter message" className="form-control" rows="4"/>
                  </div>

                  <button onClick={this.handleSubmit} className="btn">Save</button>
                  <button onClick={this.handleCancel} className="btn">Cancel</button>
              </form>  )
  }
}

export default Form;
