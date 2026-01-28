"use server"

import { connect } from "http2";
import { getSession } from "../auth/auth";
import connectDB from "../db";
import { Board, Column, JobApplication } from "../models";
import { revalidatePath } from "next/cache";

interface JobApplicationData {
    company: string;
    position: string;
    location?: string;
    notes?: string;
    salary?: string;
    jobUrl?: string;
    columnId: string;
    boardId: string;
    tags?: string[];
    description?: string;

}

export async function createJobApplication(data: JobApplicationData) {
    const session = await getSession();

    if (!session?.user) {
        throw new Error("Unauthorized");
    }
    
    await connectDB();

    const {
        company,
        position,
        location,
        notes,
        salary,
        jobUrl,
        columnId,
        boardId,
        tags,
        description
    } = data;


    if(!company || !position || !columnId || !boardId){
        throw new Error("Missing required fields");
    }
    
    // verify board belongs to user
    const board = await Board.findOne({ _id: boardId, userId: session.user.id });

    if (!board) {
        throw new Error("Board not found or unauthorized");
    }

    // verify column belongs to the user's board
    const column = await Column.findOne({
        _id: columnId,
        boardId: boardId,
      });
    // console.log(column);

    if (!column) {
        throw new Error("Column not found in the specified board");
    }

    // const maxOrder = (await JobApplication.find({ columnId }).sort({ order: -1 }).limit(1))[0]?.order || 0;
    const maxOrder = (await JobApplication.findOne({ columnId })
    .sort({ order: -1 })
    .select("order")
    .lean()) as { order: number } | null;
    
    const jobApplication = await JobApplication.create({
        company,
        position,
        location,
        notes,
        salary,
        jobUrl,
        columnId,
        boardId,
        userId: session.user.id,
        tags: tags || [],
        description,
        status: "applied",
        order: maxOrder ? maxOrder.order + 1 :0,
    });

    await Column.findByIdAndUpdate(columnId, {
        $push: { jobApplications: jobApplication._id }
    }
    )

    // Return the created job application data 
    revalidatePath("/dashboard");
    //this forces Next.js to revalidate the /dashboard page so that the new job application appears immediately.

    return {data: JSON.parse(JSON.stringify(jobApplication))};

}