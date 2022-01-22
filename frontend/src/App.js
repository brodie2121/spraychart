import logo from './logo.svg';
//import './App.css';
import React from "react";
import { Route, BrowserRouter, Router } from "react-router-dom";
import Register from "./components/register";

<BrowserRouter>
  <Route path="/users/signup" component={Register} />
</BrowserRouter>

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
  <Route path="/users/signup" component={Register} />
</BrowserRouter>
      </header>
    </div>
  );
}

export default App;
