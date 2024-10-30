import React, { useState,useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom'; 
import "../css/loginsignup.css";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);


    const navigate = useNavigate(); 

    // useEffect(() => {
    //     // Extract the token from the URL if it exists
    //     const urlParams = new URLSearchParams(window.location.search);
    //     const token = urlParams.get('token');

    //     if (token) {
    //         localStorage.setItem('token', token);
    //         navigate('/dashboard'); // or wherever you want to redirect after login
    //     }
    // }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const login = {
            email: email,
            password: password,
        };

        try {
            const res = await fetch(`http://localhost:5001/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(login),
            });

            const data = await res.json();

            if (res.status === 200) {
                console.log('Login Successful', data);
                localStorage.setItem('token', data.token); 
                localStorage.setItem('userId', data.userId); 

                navigate('/'); 
            } else {
                setErrorMessage(data.message || 'Login failed. Please try again.');
            }
        } catch (err) {
            console.log(err);
            setErrorMessage('An error occurred during login. Please try again.');
        }
    };
    const handleGoogleLogin = () => {
        window.open('http://localhost:5001/auth/google', '_self');  // Redirects to the backend for Google login
      };

    return (
        <div className="containerlogin">
            <h1>Login</h1>
            <h2>Enter your credentials</h2>
            <p style={{color:"#818898",fontWeight:600}}>Sign in with your username and password. If you don’t have an account yet, we’ll get you one set up.</p>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} 

            <form onSubmit={handleSubmit}>
                <label htmlFor="uname">
                    Username
                    <input
                        type="text"
                        name="uname"
                        id="uname"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit" className='authBtn'>Login</button>
                <button onClick={handleGoogleLogin}>
                    Sign in with Google
                </button>
                <p id="hvact" style={{color:"#818898",fontWeight:600}}>Don't have an account? <Link to="/register"><b>Sign up</b></Link></p>
            </form>
        </div>
    );
};

export default Login;