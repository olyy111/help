import React from 'react'

export default function(Com) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
    }
    handleChange = (key, v) => {
      this.setState({
        [key]: v
      })
    }
    render() {
      return <Com handleChange={this.handleChange} {...this.props} state={this.state} />
    }
  }
}

