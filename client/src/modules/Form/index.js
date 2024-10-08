import React, { useState } from "react";
import "./index.css";
import Input from "../../Components/input";
import Button from "../../Components/Button";
import { useNavigate } from "react-router-dom";


const Form = ({ isSignPage = false }) => {
  const [data, setData] = useState({
    ...(!isSignPage && {
      fullName: "",
    }), // Set an empty string by default
    email: "",
    password: "",
  });

  const navigate =useNavigate()
  const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch(`http://localhost:8000/api/${isSignPage ?  'login' : 'register'}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Add this line
    },
    body: JSON.stringify(data)

  })

  if(res.status === 400){
    alert('Invalid credentials')
  }else{
    const resData = await res.json()
  console.log('data', resData);
  if (resData.token){
    localStorage.setItem('user:token', resData.token)
    localStorage.setItem('user:detail', JSON.stringify(resData.user))
    navigate('/')
  }
  }
  
  
    
  }
  return (
    <>
    <div className="mnpg1">
      <div className="fm-body-1">
      <div className="fm-body-1_1">Welcome {isSignPage && "Back"} !</div>
      <div className="fm-body-1_2">
        {isSignPage ? "Sign in to get Explored" : "Sign up to get started"}
      </div>
      <form  className="frm-clss" onSubmit={(e) => handleSubmit(e)}>
        {!isSignPage && 
          <Input
            label="Full Name "
            name="fullName"
            placeholder="Enter your Full Name: "
            value={data.fullName}
            onChange={(e) => setData({ ...data, fullName: e.target.value })}
          />
        }
        <Input
          label="Email address "
          name="email"
          type="email"
          placeholder="Enter your Email address: "
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <Input
          label="password "
          type="password"
          name="password"
          placeholder="Enter your Password:   
 "
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <Button type="Submit" label={isSignPage ? "Sign in" : "Sign up" }  />
      </form>

      <div>
        {isSignPage ? "Didn't have an account ?" : "Already have an account ?"}
        <span className="sgn-in" onClick={()=>navigate(`/users/${isSignPage ? 'sign_up ' : 'sign_in'}`)}>{isSignPage ? "Sign up" : "Sign in "}</span>
      </div>
    </div>
    </div>

    </>

  );
};

export default Form;
