// import React, { useState } from 'react';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   const handleReset = async () => {
//     // Add API call to initiate password reset
//     try {
//       const response = await fetch('/api/auth/forgot-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });
//       const data = await response.json();
//       setMessage(data.message);
//     } catch (error) {
//       setMessage('Error sending reset instructions');
//     }
//   };

//   return (
//     <div className="containerlogin">
//       <div className="forgotMainWrapper">
//         <div className="forgotHeadingWrapper">
//           <h2>Forgot Password?</h2>
//           <h4 className="descriptiveHeading">No worries, we’ll send you reset instructions</h4>
//         </div>
//         <div className="forgotEmailWrapper">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             placeholder="Your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <p className="descriptiveHeading">
//             By creating an account, you agree to our Privacy Policy
//           </p>
//         </div>
//         <button className="authBtn" onClick={handleReset}>Reset Password</button>
//         {message && <p className="message">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;
import React, { useState } from 'react';

const ForgotPassword = ({ onNext }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setMessage(data.message);
      
      // Proceed to OTP verification if the reset email is successfully sent
      if (data.success) {
        onNext('otp', { email }); // Move to OTP step with email passed as data
      }
    } catch (error) {
      setMessage('Error sending reset instructions');
    }
  };

  return (
    <div className="containerlogin">
      <div className="forgotMainWrapper">
        <div className="forgotHeadingWrapper">
          <h2>Forgot Password?</h2>
          <h4 className="descriptiveHeading">No worries, we’ll send you reset instructions</h4>
        </div>
        <div className="forgotEmailWrapper">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="descriptiveHeading">
            By creating an account, you agree to our Privacy Policy
          </p>
        </div>
        <button className="authBtn" onClick={handleReset}>Reset Password</button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;