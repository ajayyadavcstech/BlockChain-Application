import React, { useState } from "react";
import { render } from "react-dom";
import { custom_greeting_backend } from "../../declarations/custom_greeting_backend/index";
import Loginpage from "./components/Loginpage";
import RegistrationForm from "./components/RegistrationForm";
import Info from "./components/Info";


const App = () => {
  var [display,setdisplay] = useState(0);

  return (
    <div className="app">
      {display==0 ? <Loginpage Setdisplay={setdisplay} /> : 
      (display==1 ? <RegistrationForm Setdisplay={setdisplay} /> :
       <Info Setdisplay={setdisplay} />)}
    </div>
  );
};
render(<App />, document.getElementById("app"));
