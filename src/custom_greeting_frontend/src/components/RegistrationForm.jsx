import React, { useState } from 'react';
import { custom_greeting_backend } from '../../../declarations/custom_greeting_backend/index';
import './RegistrationForm.css';

const RegistrationForm = (args) => {
  var [firstName,setFirstName] = useState("")
  var [lastName,setlastName] = useState("")
  var [age,setage] = useState("")
  var [mobileNumber,serMobileNumber] = useState("")
  var [password,serPassword] = useState("")
  var [accountNumber,setAccountNumber] = useState("");
    
  var RegisterUser = async ()=>{
     let registrationStatus = await custom_greeting_backend.RegisterUser(accountNumber, password,firstName+" "+lastName,parseInt(age),parseInt(mobileNumber));
      registrationStatus = parseInt(registrationStatus);
     if(registrationStatus==-1) alert("Failed to Register User!")
     else {
      alert("Registration Succefull")
      LoginPage();
    }
  }

  var LoginPage = async ()=>{
    args.Setdisplay(0);
  }
  return (
    <div className='registerpage'>
        <div className='register-user'>Register New User</div>
      <div  className="registerpage-container" >
            <span>Account Number : </span>
            <input type="number" value={accountNumber} onChange={(e)=>setAccountNumber(e.target.value)} />

            <span>First Name : </span>
            <input type="text" value={firstName} onChange={(e)=> setFirstName(e.target.value)} />

            <span>Last Name :</span>
            <input type="text" value={lastName} onChange={(e)=> setlastName(e.target.value)} />

            <span>Age :</span>
            <input type="number" value={age} onChange={(e)=> setage(e.target.value)} />

            <span>Mobile Number :</span>
            <input type="number" value={mobileNumber} onChange={(e)=> serMobileNumber(e.target.value)} />

            <span>Password:</span>
            <input type="password" value={password} onChange={(e)=> serPassword(e.target.value) } />
          
            <div className='registration-btn-container'>
              <button className='btn' type="button" value="" onClick={RegisterUser} >Register</button>
            </div>
      </div >
          <p className='registratoin-login'>Already have an account? <button className='btn' type="button" value="" onClick={LoginPage} >Login here</button></p>
    </div>
  );
};

export default RegistrationForm;
