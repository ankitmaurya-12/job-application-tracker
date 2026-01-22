import { getSession } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function Dashoard () {
  const session = await getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <div>
      Dashboard
    </div>
  )
}

