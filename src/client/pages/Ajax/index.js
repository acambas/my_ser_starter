import React from 'react'
import axios from 'axios'

class Clock extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    axios.get('api/test').then(res => {
      this.setState({ api: res })
    })
  }

  render() {
    const state = this.state
    return (
      <span id="ajax">
        {state.api ? JSON.stringify(state.api.data) : 'no response yet'}
      </span>
    )
  }
}

export default Clock
