import React from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { login, signup } from "../../Actions/AuthAction";
const Auth = () => {
  const [issignup,setIsSignUp]=useState(false);
  const [confirmpassword,setConfirmpassword]=useState(false);
  const [data,setData]=useState({firstname:"",lastname:"",password:"",confirmpass:"",username:""});
  const dispatch=useDispatch();
  const loading=useSelector((state)=> state.authReducer.loading)
  console.log(loading);
  const handleChange=(event)=>{
    setData({...data,[event.target.name]:event.target.value});
  
  }

  const handleSubmit=(e)=>{
     e.preventDefault();
     if(issignup){
      if(data.password!==data.confirmpass){
        setConfirmpassword(true);
      }else{
        dispatch(signup(data));
        setConfirmpassword(false);
      }
     }else{
      dispatch(login(data));
      resetform();
     }
  };
  const resetform=()=>{
    setData({firstname:"",lastname:"",password:"",confirmpass:"",username:""});
    setConfirmpassword(false);
  }
  return (
    <div className="Auth">
      {/* left */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>DOS Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      {/* right */}
      <div className="a-right">
      <form className="infoForm authForm" onSubmit={handleSubmit}>
        <h3>{issignup ? "Sign up":'Login'}</h3>

        {issignup &&
          <div>
             <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstname"
            onChange={handleChange}
            value={data.firstname}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastname"
            onChange={handleChange}
            value={data.lastname}

          />
          </div>
             }

        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            placeholder="Usernames"
            onChange={handleChange}
            value={data.username}

          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={data.password}

          />
          { issignup &&
          <input
          type="text"
          className="infoInput"
          name="confirmpass"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={data.confirmpass}

        />}
        </div>
        {
          issignup &&
          <span style={{display: confirmpassword ? "block":"none",color:"red",fontSize: '12px'}}>Password not matched</span>
        }

        <div>
            <span onClick={()=>{resetform();setIsSignUp((prev)=>!prev);} } style={{fontSize: '12px',cursor:"pointer" ,color:"blue"}}>{issignup ? 'Already have an account? Login!':"Don't have an account? SingUp!"}</span>
        </div>
        <button disabled={false}
        className="button infoButton" type="submit">{ loading ? "Loading..":issignup ? 'Signup':'Login'}</button>
      </form>
    </div>
    </div>
  );
};



export default Auth;
