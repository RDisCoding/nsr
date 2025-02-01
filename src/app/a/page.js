// src/app/a/page.js
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoggedInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold">Welcome, {session?.user?.name}!</h1>
      <p className="mt-4">You are now logged in.</p>
    </div>
  );
}