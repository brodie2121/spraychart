import React, { Component } from "react";

class Logout extends Component {
  componentDidMount() {
    window.sessionStorage.clear();

    this.setState({
      login: false
    });
  }

  render() {
    return <div>Now Logged Out</div>;
  }
}

export default Logout;