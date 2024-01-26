import React, { useState } from 'react';
import { custom_greeting_backend } from '../../../declarations/custom_greeting_backend/index';
import RegistrationForm from './RegistrationForm';
import './Loginpage.css';
const Loginpage = (args) => {
  var [accountNumber,setAccountNumber] = useState("");
  var [password,setrpassword] = useState("");
  var verifyLogin = async ()=>{
      var isVerified = await custom_greeting_backend.LoginUser(accountNumber, password);
      isVerified =  parseInt(isVerified);
      if(isVerified==1) args.Setdisplay(2);
      else alert("Account Number or Password Wrong",isVerified);
  }

  var openRegisterationPage = async ()=>{
    args.Setdisplay(1);
  }

  return (
    <div className='login'>
    <div className='login-user'>Login User</div>
    <div  className='login-form'>
        <span>Account Number:</span>
        <input type="number" value={accountNumber} onChange={(e)=> setAccountNumber(e.target.value)} />

        <span>Password:</span>
        <input type="password" value={password} onChange={(e)=>setrpassword(e.target.value)} />

        <div className='loggin-btn-container'>
         <button className='btn' type="button" onClick={verifyLogin}>Login</button>
        </div>

    </div>
    <p className='login-registration'> <span>Don't have an account? </span><button className='btn' onClick={openRegisterationPage}>Register here</button></p>
  </div>
  );
};


export default Loginpage;
