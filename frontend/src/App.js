
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
  
  changeLoginState = (user) => {
    const { login, id, firstname, lastname, email, phone, coursename } = user;
    this.setState({
      isLoggedIn: login,
      id,
      firstname,
      lastname,
      email,
      phone,
      coursename
    })
  }

render() {
  const { isLoggedIn } = this.state
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
