import React from 'react'
import "../css/loginsignup.css"
import "../css/default.css"

const Login = () => {
  return (
    <div className="containerlogin">
        <h1>Login</h1>
        <h2>Enter your credentials</h2>
        <p>Sign in with your username and password. If you don’t have an account yet, we’ll get you one set up.</p>
        <form>
            <label htmlFor="uname">
                Username
                <input type="text" name="uname" id="uname" />
            </label>
            <label htmlFor="password">
                Password
                <input type="password" name="password" id="password" />
            </label>
            <button type="submit">Login</button>
            <p id="hvact">Already have an account? <b>Sign up</b></p>
        </form>
    </div>
  )
}

export default Login