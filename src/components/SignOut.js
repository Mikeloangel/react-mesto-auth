import React from "react";
import { withRouter } from "react-router-dom";
import * as apiAuth from '../utils/ApiAuth';

class SignOut extends React.Component {
  componentDidMount() {
    apiAuth.forgetToken();
    this.props.onSignOut();
    this.props.history.push('/sign-in');
  }

  render() {
    return (<></>)
  }
}

export default withRouter(SignOut);
