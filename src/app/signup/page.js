'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    return { minLength, hasNumber, hasUppercase };
  };

  const checkUserExists = async () => {
    const res = await fetch('/api/check-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email }),
    });

    const data = await res.json();
    if (data.exists) {
      setErrors(data.errors);
    }
    return !data.exists;
  };

  const sendOtp = async () => {
    // Ensure the user doesn't exist before sending an OTP
    if (!(await checkUserExists())) return;
    // Ensure password and confirm password match
    if (password !== confirmPassword) {
      setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
      return;
    }

    setLoading(true);
    const res = await fetch('/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setShowOtpField(true);
    } else {
      const data = await res.json();
      setErrors({ ...errors, otp: data.message || 'Failed to send OTP' });
    }
    setLoading(false);
  };

  const registerUser = async () => {
    setLoading(true);
    const payload = { username, email, password };
    console.log('Registration payload:', payload); // Debug: ensure email is present

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      const data = await res.json();
      setErrors({ ...errors, form: data.message });
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    setLoading(true);
    const res = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });

    if (!res.ok) {
      setErrors({ otp: 'Invalid or expired OTP' });
      setLoading(false);
      return;
    }
    // On successful OTP verification, register the user
    registerUser();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-center">Sign Up</h2>

      {errors.form && <p className="text-red-500">{errors.form}</p>}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border rounded mt-2"
      />
      {errors.username && <p className="text-red-500">{errors.username}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mt-2"
      />
      {errors.email && <p className="text-red-500">{errors.email}</p>}

      <div className="relative">
        <input
          type={passwordVisible ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mt-2"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-3 mt-3"
          onClick={() => setPasswordVisible(!passwordVisible)}
        >
          👁
        </button>
      </div>
      <p className="text-xs">
        Password Strength: {validatePassword(password).minLength ? '✅' : '❌'}{' '}
        {validatePassword(password).hasNumber ? '✅' : '❌'}{' '}
        {validatePassword(password).hasUppercase ? '✅' : '❌'}
      </p>

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full p-2 border rounded mt-2"
      />
      {password !== confirmPassword && (
        <p className="text-red-500">Passwords do not match</p>
      )}

      {!showOtpField ? (
        <button
          className="w-full bg-blue-500 text-white p-2 rounded mt-3"
          onClick={sendOtp}
          disabled={loading}
        >
          {loading ? 'Sending OTP...' : 'Send OTP'}
        </button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded mt-2"
          />
          {errors.otp && <p className="text-red-500">{errors.otp}</p>}

          <button
            className="w-full bg-green-500 text-white p-2 rounded mt-3"
            onClick={verifyOtp}
            disabled={loading}
          >
            {loading ? 'Verifying OTP...' : 'Verify & Register'}
          </button>
        </>
      )}
    </div>
  );
}
