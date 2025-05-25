"use client";

import { useSession, signOut } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading session...</p>;

  if (!session) {
    return (
      <div>
        <p>You are not signed in.</p>
        <a href="/login">Go to Login</a>
      </div>
    );
  }

  return (
    <div>
      <p>
        Welcome, {session.user.name} ({session.user.email})
      </p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
