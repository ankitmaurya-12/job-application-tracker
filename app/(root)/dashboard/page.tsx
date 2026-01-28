
import KabanBoard from '@/components/kanban-board';
import { getSession } from '@/lib/auth/auth';
import connectDB from '@/lib/db';
import { Board } from '@/lib/models';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'

async function getBoard(userId: string) {

    "use cache"
    //for making this as cache we made this function

   // We can directly use the database here because this is a server component
   await connectDB();

   // Example: Fetch the user's boards from the database
   const boardDoc = await Board.findOne({
    //  userId: session.user.id,
     userId: userId,
     name: "Job Hunt"
   }).populate({
     path : 'columns',
     populate:{
       path:"jobApplications"
     }
   })
 
   // console.log(board);

   if(!boardDoc){
      return null;
    }

  //  const board = boardDoc ? boardDoc.toObject() : null;
    const board = boardDoc ? JSON.parse(JSON.stringify(boardDoc)) : null;
   
   return board;
}

async function DashboardPage(){
  // Get the user session
  const session = await getSession();
  const board = await getBoard(session?.user.id ?? "");

  if (!session?.user) {
    redirect("/sign-in");
  }

  // if (!board) {
  //   return <div className='min-h-screen flex items-center justify-center'>
  //     <p className='text-gray-600'>Loading your board...</p>
  //   </div>
  // }

  return (
    <div className='min-h-screen bg-white'>
      <div className='container mx-auto p-6'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold text-black'>{board.name}</h1>
          <p className='text-gray-600'>Track your job applications</p>
        </div>
        
        {/* Render Kanban Board Here */}
        <KabanBoard board={board} userId={session.user.id}/>
      </div>
    </div>
  )
}

export default async function Dashoard () {
    return (
      <Suspense fallback={<div className='min-h-screen flex items-center justify-center'>
        <p className='text-gray-600'>Loading dashboard...</p>
      </div>}>
        <DashboardPage/>
      </Suspense>
    )
}

