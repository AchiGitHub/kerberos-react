import React, { Component } from 'react'
import { connect } from "react-redux";

import { loginActions } from 'modules/login/ducks'

export class Logout extends Component {
  componentWillMount() {
    this.props.sessionEnd() // terminate the session 
  }
  render(){
    return null
  }
}

export default connect(null, loginActions)(Logout);