import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TokenContext from "../contexts/TokenContext";

import Header from "./Header";
import Initial from "./Initial";
import Signup from "./Signup";
import Signin from "./Signin";
import Main from "./Main";

function App() {
  let tokenStorage = localStorage.getItem("token");

  if (tokenStorage !== null) {
    tokenStorage = JSON.parse(tokenStorage);
  }

  const [token, setToken] = useState(tokenStorage);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={ <Initial /> } />
          <Route path='/signup' element={ <Signup /> } />
          <Route path='/signin' element={ <Signin /> } />
          <Route path='/main' element={ <Main /> } />
        </Routes>
      </BrowserRouter>
    </TokenContext.Provider>
    
  );
}

export default App;
