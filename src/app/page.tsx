'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Yükleniyor...</p>;
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <button
        onClick={() =>
          signIn("auth0", { prompt: "login" })
        }
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        Giriş Yap
      </button>
    </div>
  );
}
