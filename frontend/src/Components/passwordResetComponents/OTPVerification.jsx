import React, { useState } from 'react';

const OTPVerification = ({ email, onNext }) => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleVerifyOTP = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (data.success) {
        onNext('newPassword', { resetToken: data.resetToken }); // Move to set new password step
      } else {
        setMessage('Invalid OTP');
      }
    } catch (error) {
      setMessage('Failed to verify OTP');
    }
  };

  return (
    <div className="otp-verification">
      <h2>Enter OTP</h2>
      <p>We sent a code to {email}</p>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerifyOTP}>Confirm</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OTPVerification;