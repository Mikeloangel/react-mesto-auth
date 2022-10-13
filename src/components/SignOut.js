import React from "react";
import { Redirect, withRouter } from "react-router-dom";

class SignOut extends React.Component {
  componentDidMount() {
    this.props.onSignOut();
  }

  componentDidUpdate(){
    this.props.onSignOut();
  }

  render() {
    return (
      <Redirect to="/sign-in" />
      // <p className="section__title">Out</p>
    )
  }
}

export default withRouter(SignOut);
