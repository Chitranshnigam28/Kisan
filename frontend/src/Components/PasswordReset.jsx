import React, { useState } from 'react';
import ForgotPassword from './passwordResetComponents/ForgotPassword';
import OTPVerification from './passwordResetComponents/OTPVerification';
import SetNewPassword from './passwordResetComponents/SetNewPassword';

const PasswordReset = () => {
  const [step, setStep] = useState('email'); // Tracks the current step
  const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
  const [resetToken, setResetToken] = useState(''); // Store token received after OTP verification

  const handleNextStep = (nextStep, data = {}) => {
    setStep(nextStep);
    if (data.email) setEmail(data.email);
    if (data.resetToken) setResetToken(data.resetToken);
  };

  return (
    <div className="password-reset-container">
      {step === 'email' && <ForgotPassword onNext={handleNextStep} />}
      {step === 'otp' && <OTPVerification email={email} onNext={handleNextStep} />}
      {step === 'newPassword' && <SetNewPassword resetToken={resetToken} />}
    </div>
  );
};

export default PasswordReset;