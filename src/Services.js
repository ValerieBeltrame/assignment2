import React, { Component } from 'react';
import './App.css';
import Note from './Note.js';
import axios from 'axios';

// import _ from 'lodash';

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], editNote: {} };
    this.loadNotesFromServer = this.loadNotesFromServer.bind(this);
  }

  handleSubmit(event)  {
    event.preventDefault();
    this.addNote(this.state.editNote);
  };

  handleChange(e) {
    this.setState({ editNote: { text: e.target.value } });
  }

  handleEditNote(id, newText) {
    const data = {
      id: id,
      text: newText,
    }
    return axios.put('http://localhost:3001/api/notes', data)
         .then(res => {
            this.loadNotesFromServer();
          });
  }

  loadNotesFromServer() {
    axios.get('http://localhost:3001/api/notes')
         .then(res => {
            return this.setState({ data: res.data });
          });
  }

  addNote(data) {
    axios.post('http://localhost:3001/api/notes', data)
         .then(res => {
            this.loadNotesFromServer();
          });
  }

  componentDidMount() {
    this.loadNotesFromServer();
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Api tryout</h2>
        </div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h2>New note</h2>
          <input type="textbox" onChange={this.handleChange.bind(this)}></input>
          <br /><br />
          <input type="submit" value="Create" />
        </form>
        <br />
        {this.state.data.map((note) => { return <Note key={note._id} id={note._id} text={note.text} editNote={this.handleEditNote.bind(this)} />; })}
          <div className="App-header">
            <h2>Google login tryout</h2>
            <br />
            <div className="g-signin2" data-onsuccess="onSignIn"></div>
            <br />
          </div>
          <br />
      </div>
    );
  }
}

export default Services;
