'use client';

import Link from 'next/link';
import { useSession, signOut, signIn } from 'next-auth/react';

export default function Navbar() {
    const { data: session, status } = useSession();

    const handleLogout = () => {
        // Auth0 gerekli parametreler
        const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
        const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
        const returnTo = 'http://localhost:3000';
        // Auth0 çıkış url
        const logoutUrl = `${domain}/v2/logout?client_id=${clientId}&returnTo=${encodeURIComponent(returnTo)}`;

        signOut({
            redirect: false,
        }).then(() => {
            window.location.href = logoutUrl;
        });
    };





    return (
        <nav className="bg-gray-800 text-white px-6 py-4 shadow">
            <div className="flex justify-between items-center">
                <Link href="/" className="text-xl font-semibold">
                    NextAuth App
                </Link>

                <div className="flex items-center gap-4">
                    {status === 'loading' ? (
                        <p>Yükleniyor...</p>
                    ) : session ? (
                        <>
                            {session.user?.role === 'admin' && (
                                <Link href="/admin" className="hover:underline">
                                    Admin Paneli
                                </Link>
                            )}
                            {session.user?.role !== 'admin' && (
                                <Link href="/dashboard" className="hover:underline">
                                    Dashboard
                                </Link>
                            )}
                            <span className="text-sm">{session.user?.email}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                            >
                                Çıkış Yap
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => signIn('auth0', { prompt: 'login' })}
                            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Giriş Yap
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
