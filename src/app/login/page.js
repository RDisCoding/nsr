// src/app/login/page.js
'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login({ onToggle }) {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      identifier,
      password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      router.push('/a');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email or Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full p-2 border rounded mt-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mt-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-3 hover:bg-blue-600">
          Login
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        Don't have an account?{" "}
        <button
          onClick={onToggle}
          className="text-blue-500 hover:underline"
        >
          Sign up
        </button>
      </p>
    </div>
  );
}