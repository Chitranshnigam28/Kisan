import React from 'react'
import "../css/loginsignup.css"
const SignUp = () => {
    return (
        <div className="containersignup">
            <h1>SignUp</h1>
            <h2>Set up credentials</h2>
        <p>Sign Up by creating your username and password.</p>
        <form>
            <label htmlFor="uname">
                Username
                <input type="text" name="uname" id="uname" />
            </label>
            <label htmlFor="password">
               Create Password
                <input type="password" name="password" id="password" />
            </label>
            
            <label htmlFor="password">
               Create Password
                <input type="password" name="password" id="password" />
            </label>
            <p id="hvact">Please agree to Art Asta <b>Terms of Use</b> and
<b>Privacy Policy</b>, and to receive emails from kisan.</p>
            
            <button type="submit">Next</button>
            <p id="hvact">Already have an account? <b>Sign up</b></p>
        </form>
            </div>
    )
}

export default SignUp