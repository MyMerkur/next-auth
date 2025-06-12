'use client';

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      {/* Auth0 ile giriş yap butonu */}
      <button
        onClick={() => signIn("auth0")}
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        Auth0 ile Giriş Yap
      </button>
    </div>
  );
}
