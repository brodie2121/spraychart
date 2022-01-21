import logo from './logo.svg';
import './App.css';
import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter, Router } from "react-router-dom";
import Register from "./components/register";

function App() {
  return (
<Router>
<Route path="/users/signup?" component={Register} />
</Router>
  );
}

export default App;
