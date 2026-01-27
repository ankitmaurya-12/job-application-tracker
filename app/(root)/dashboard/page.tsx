import KabanBoard from '@/components/kanban-board';
import { getSession } from '@/lib/auth/auth';
import connectDB from '@/lib/db';
import { Board } from '@/lib/models';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function Dashoard () {
  // Get the user session
  const session = await getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  // We can directly use the database here because this is a server component
  await connectDB();

  // Example: Fetch the user's boards from the database
  const board = await Board.findOne({
    userId: session.user.id,
    name: "Job Hunt"
  }).populate({
    path : 'columns',
    populate:{
      path:"jobApplications"
    }
  })

  // console.log(board);
  
  return (
    <div className='min-h-screen bg-white'>
      <div className='container mx-auto p-6'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold text-black'>{board.name}</h1>
          <p className='text-gray-600'>Track your job applications</p>
        </div>
        
        {/* Render Kanban Board Here */}
        <KabanBoard board={JSON.parse(JSON.stringify(board))} userId={session.user.id}/>
      </div>
    </div>
  )
}

