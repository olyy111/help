import React from 'react'
import jobImg from './job.png'
import './logo.css'

class Logo extends React.Component {
  render () {
    return  (
      <div className="logewapper">
        <img src={jobImg} alt=""/>
      </div>
    )
  }
}
export default Logo