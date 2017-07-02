import React from 'react';
import { Component } from 'preact';
import axios from 'axios';

class Clock extends Component {
  constructor() {
    super();
    // set initial time:
    this.state = {};
  }

  componentDidMount() {
    // update time every second
    axios.get('/api/test').then(res => {
      this.setState({ api: res });
    });
  }

  render(props, state) {
    return (
      <span>
        {state.api ? JSON.stringify(state.api.data) : 'no response yet'}
      </span>
    );
  }
}

export default Clock;
