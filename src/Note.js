import React, { Component } from 'react';
import './App.css';

class Note extends Component {
  state = {
    editing: false,
    inputText: this.props.text
  };
  handleEditMode() {
    this.setState({ editing: true });
  }
  handleCancelEdit() {
    this.setState({ editing: false, inputText: this.props.text });
  }
  handleChange(e) {
    this.setState({ inputText: e.target.value })
  }
  handleSave() {
    this.setState({ editing: false, inputText: this.state.inputText });
    this.props.editNote(this.props.id, this.state.inputText)
  }

  render() {
    return (
      <div style={{ border: '1px black solid', padding: '10px', margin: '10px' }} className="note">
        {this.state.editing
        ? <div>
            <p>
              <input type="textbox" value={this.state.inputText} onChange={this.handleChange.bind(this)}></input>
            </p>
            <button onClick={this.handleCancelEdit.bind(this)}>Dismiss</button>
            <button onClick={this.handleSave.bind(this)}>Save</button>
          </div>
        : <div>
            <p>{this.props.text}</p>
            <button onClick={this.handleEditMode.bind(this)}>Edit</button>
          </div>
      } <br />
      </div>
    );
  }
}

export default Note;
