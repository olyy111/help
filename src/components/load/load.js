import React from 'react'
import { connect } from 'react-redux'

@connect(
  state => state
)
class Load extends React.component {
  componentDidMount(){
    
  }
  render() {
    return (
      <div className="loading">12312</div>
    )
  }
}