import React from 'react'
import "../css/loginsignup.css"
import "../css/default.css"
import {useState} from 'react'

const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const login={
            email:email,
            password:password
        }
        try{
            const res=await fetch(`http://localhost:5001/api/login`,{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
               
                body: JSON.stringify(login)
            } )
            const data=await res.json();
            console.log("data "+data);
            if(res.status==200){
                console.log('Login Successfull',data);
            }
        }catch(err){
            console.log(err);
        }
    }
  return (
    <div className="containerlogin" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <h2>Enter your credentials</h2>
        <p>Sign in with your username and password. If you don’t have an account yet, we’ll get you one set up.</p>
        <form>
            <label htmlFor="uname">
                Username
                <input type="text" name="uname" id="uname" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            </label>
            <label htmlFor="password">
                Password
                <input type="password" name="password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </label>
            <button type="submit">Login</button>
            <p id="hvact">Already have an account? <b>Sign up</b></p>
        </form>
    </div>
  )
}

export default Login