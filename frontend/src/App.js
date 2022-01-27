
//import './App.css';
import React from "react";
import { Route, BrowserRouter, Router } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
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
        <BrowserRouter>
          <Route path="/users/login" component={Login} />
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
