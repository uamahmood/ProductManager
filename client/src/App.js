import React, { useState } from 'react';
import { Router } from "@reach/router"
import "./bootstrap.css"

import DisplayProduct from "./views/DisplayProduct"
import CreateView from "./views/CreateView"
import EditView from "./views/EditView"

function App() {
  const [counter, setCounter] = useState({count: 0})

  return (
    <div className="App">
    
      <Router>
        <CreateView counter={counter} setCounter={setCounter} path="/"/>
        <DisplayProduct path="/products/:id" />
        <EditView path="/products/:id/edit" />
      </Router>      
    </div>
  );
}

export default App;
