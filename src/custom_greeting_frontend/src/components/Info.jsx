    import React,{useState,useEffect} from 'react'
    import { parseArgs } from 'util';
    import { custom_greeting_backend } from '../../../declarations/custom_greeting_backend/index';
    import './Info.css'


    export default function Info(args) {
        var [curBalance,setCurrentBalance] = useState();
        var [name,setName] = useState();
        var [accountNumber,setAccountNumber] = useState("");
        var [mobileNumber,setMobileNumber] = useState();
        var [age,setAge] = useState();


        var [amount,setAmount] = useState();
        var [amountToTranfer,setamountToTranfer] = useState();
        var [payeeAccountNumber,setpayeeAccountNumber] = useState();


        var setCustomerDetails = async ()=>{
            let obj = await custom_greeting_backend.getCustomerInfo();
            obj = JSON.parse(obj)
            setCurrentBalance(obj.curBalance)
            setName(obj.fullName)
            setAccountNumber(obj.accountNumber)
            setMobileNumber(obj.mobileNumber)
            setAge(obj.age)
        }
        useEffect(()=>{
            setCustomerDetails();
        },[])

        var topUp = async ()=>{
        let progress = await custom_greeting_backend.TopUp(accountNumber,parseInt(amount));
        if(progress==-1) alert("topUp failed")
        else alert("Money added into the wallet")
            setAmount(0);
            setCustomerDetails();
        }

        var Withdraw = async ()=>{
            let progress = await custom_greeting_backend.Withdraw(accountNumber,parseInt(amount));
            if(progress==-1) alert("Withdrawal failed");
            else alert("Money succefully Withdrawn")
            setAmount(0);
            setCustomerDetails();
        }
        var fundTransfer = async ()=>{
            let progress = await custom_greeting_backend.TransferFund(accountNumber,payeeAccountNumber,parseInt(amountToTranfer));
            if(progress==-1) alert("fund transfer failed")
            else alert("Succefully Transferd !")
            setpayeeAccountNumber("")
            setamountToTranfer(0);
            setCustomerDetails();
        }
        var logOut = ()=>{
            args.Setdisplay(0);
        }


        return (
            <div className='info'>

            <div className='info-userinfo'>
                <div className='info-heading'>Users Information</div>
                <div className='infor-userinfocontainer'>
                    <div>Current Balance : </div>  <span>{curBalance }</span>
                    <div htmlFor="">Name :</div>  <span> { name}</span>
                    <div>Account Number : </div>  <span>{accountNumber }</span>
                    <div>Mobile Number : </div>  <span>{ mobileNumber}</span>
                    <div>Age : </div> <span>{age }</span>
                </div>
            </div>

            <div className='money-manage'>
                <div className='moneytopupwith'>
                    <div>TopUp and Withdaw Money</div>
                    <div className='moneytopupwith-container'>
                        <input placeholder='Amount' type="number" value={amount} onChange={e=>setAmount(e.target.value)} />
                        <div className='moneytopupwith-container-btn' >
                            <button className='btn' onClick={topUp}>TopUp</button>
                            <button className=' btn' onClick={Withdraw}>Withdraw</button>
                        </div>  
                    </div>
                </div>

                <div className='moneytranfer'>
                    <div>Tranfer Money</div>
                    <div className='moneytranfer-container'>
                        <input  placeholder='Amount' type="number" value={amountToTranfer} onChange={e=>setamountToTranfer(e.target.value)} />
                        <input placeholder='Payee Account Number' type="number" value={payeeAccountNumber} onChange={e=>setpayeeAccountNumber(e.target.value)} />
                        <button className='btn' onClick={fundTransfer}>Fund Transfer</button>
                    </div>
                </div>
            </div>

            <button className='btn' onClick={logOut}>LogOut</button>
        </div>
        )
    }

