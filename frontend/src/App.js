
//import './App.css';
import React, { Component } from "react";
import { Route, BrowserRouter, Router } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import Homepage from "./components/homepage";

class App extends Component {
  state = {
    isLoggedIn: false,
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    coursename: ''
  }
  
  componentDidMount() {
    const employeeStatus = JSON.parse(
      window.sessionStorage.getItem("employee")
    );
    if (!!employeeStatus) {
      this.setInitialState(employeeStatus);
    }
  }

  handleLoginState = async employee => {
    this.setInitialState(employee);
    window.sessionStorage.setItem("employee", JSON.stringify(employee));
  };

  setInitialState = user => {
    const { id, firstname, lastname, email, phone, coursename } = user;

    this.setState({ id, firstname, lastname, email, phone, coursename });
  };

  handleLogoutState = () => {
    window.sessionStorage.clear();
    console.log("logout handler fired");
    this.setState({
      login: false,
      id: 0,
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    coursename: "",
    user: {}
    });
  };

render() {
  const { login } = this.state;
  window.sessionStorage.setItem("loggedInStatus", login);
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Route path="/users/signup" component={Register} />
          <Route path="/users/login" component={Login} />
          <Route path="/home" exact component={Homepage} />
        </BrowserRouter>
      </header>
    </div>
  );
}
}
export default App;
