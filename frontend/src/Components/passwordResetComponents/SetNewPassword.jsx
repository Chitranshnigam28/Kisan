import React, { useState } from 'react';

const SetNewPassword = ({ resetToken }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, resetToken }),
      });
      const data = await response.json();
      setMessage(data.message || 'Password reset successful');
    } catch (error) {
      setMessage('Failed to reset password');
    }
  };

  return (
    <div className="set-new-password">
      <h2>Set New Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handlePasswordReset}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SetNewPassword;