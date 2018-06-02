import React from 'react'

function form(Com) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
    }

    handleChange = (key, value) => {
      this.setState({[key]: value})
    }

    render() {
      return <Com state={this.state} handleChange={this.handleChange} {...this.props} />
    }
  }
}
export default form