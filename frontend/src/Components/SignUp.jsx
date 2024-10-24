import React from 'react'
import "../css/loginsignup.css"
import {useState} from 'react';
import {Link } from 'react-router-dom' 

const SignUp = () => {
    const [uname,setUname]=useState('');
    const [password,setPassword]=useState('');
    const [cpassword,setCPassword]=useState('');
    const [email,setEmail]=useState('');
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const usrname=uname;
        const eml=email;
        const pwd=password;
        const cpwd=cpassword;
        console.log("usrname "+usrname);
        console.log("email "+email);
        console.log("pwd "+pwd);
        console.log("cpwd "+cpwd);
        if(pwd===cpwd){
            console.log("matched");
        
        const registerData={
        username:uname,
        email:email,
        password:password,
        
        }
        console.log("registerData "+JSON.stringify(registerData));
        try {
            const res=await fetch(`http://localhost:5001/api/register`,{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
               
                body: JSON.stringify(registerData)
            })
            const data=await res.json();
            if(res.status===200){
                console.log("registration succesfull");
            }
        } catch (error) {
            console.log(error);
        }
    }

    }
    return (
        <div className="containersignup">
            <h1>SignUp</h1>
            <h2>Set up credentials</h2>
        <p style={{color:"#818898",fontWeight:600}}>Sign Up by creating your username and password.</p>
        <form onSubmit={handleSubmit}>
            <label htmlFor="uname">
                Username
                <input type="text" name="uname" id="uname" value={uname} onChange={(e)=>{setUname(e.target.value)}}/>
            </label>
            <label htmlFor="email">
                Email
                <input type="text" name="email" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </label>
            <label htmlFor="password">
               Create Password
                <input type="password" name="password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </label>
            
            <label htmlFor="password">
               Confirm Password
                <input type="password" name="password" id="password" value={cpassword} onChange={(e)=>{setCPassword(e.target.value)}}/>
            </label>
            <p id="hvact" style={{color:"#818898",fontWeight:600}}>Please agree to Art Asta <b>Terms of Use</b> and
<b>Privacy Policy</b>, and to receive emails from kisan.</p>
            
            <button type="submit" className='authBtn'>Next</button>
            <p id="hvact" style={{color:"#818898",fontWeight:600}}>Already have an account? <Link to="/login"><b>Log In</b></Link></p>
        </form>
            </div>
    )
}

export default SignUp