'use client';

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Hoş geldin, {session?.user?.email}</p>
      <p>Rolün: {session?.user?.role}</p>
    </div>
  );
}
