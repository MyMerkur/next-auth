// 'use client';

// import { signIn } from "next-auth/react";

// export default function LoginPage() {
//   return (
//     <div className="h-screen flex items-center justify-center">
//       {/* Auth0 ile giriş yap butonu */}
//       <button
//         onClick={() => signIn("auth0")}
//         className="bg-blue-600 text-white px-6 py-3 rounded"
//       >
//         Auth0 ile Giriş Yap
//       </button>
//     </div>
//   );
// }


'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    await signIn('auth0', {
      prompt: 'login',
      callbackUrl: '/',
    });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">Giriş Yap</h2>
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          {loading ? 'Yönlendiriliyor...' : 'Auth0 ile Giriş Yap'}
        </button>
      </div>
    </div>
  );
}
