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

export async function updateJobApplication(
  id: string,
  updates: {
    company?: string;       
    position?: string;  
    location?: string;
    notes?: string;
    salary?: string;
    jobUrl?: string;
    columnId?: string;
    order?: number;
    tags?: string[];
    description?: string;
  }
) {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await connectDB();

  const jobApplication = await JobApplication.findById(id);

  if (!jobApplication) {
    throw new Error("Job Application not found");
  }

  if (jobApplication.userId.toString() !== session.user.id) {
    throw new Error("Unauthorized");
  }

  const { columnId, order, ...otherUpdates } = updates;

  const updatesToApply: Partial<{
    company: string;
    position: string;
    location: string;
    notes: string;
    salary: string;
    jobUrl: string;
    columnId: string;
    order: number;
    tags: string[];
    description: string;
  }> = otherUpdates;

  const currentColumnId = jobApplication.columnId.toString();

  const newColumnId = columnId?.toString() || currentColumnId;

  const isMovingToDiffrentColumn =
    newColumnId && newColumnId !== currentColumnId;

  if (isMovingToDiffrentColumn) {
    await Column.findByIdAndUpdate(currentColumnId, {
      $pull: { jobApplications: id },
    });

    const jobsInTargetColumn = await JobApplication.find({
      columnId: newColumnId,
      _id: { $ne: id },
    })
      .sort({ order: 1 })
      .lean();

    let newOrderValue: number;

    if (order !== undefined && order !== null) {
      newOrderValue = order * 100;

      const jobsThatNeedToShift = jobsInTargetColumn.slice(order);

      for (const job of jobsInTargetColumn) {
        await JobApplication.findByIdAndUpdate(job._id, {
          $set: { order: job.order + 100 },
        });
      }
    } else {
        // Add to the end 
      if (jobsInTargetColumn.length > 0) {
        const lastJobOrder =
          jobsInTargetColumn[jobsInTargetColumn.length - 1].order + 100;
        newOrderValue = lastJobOrder + 100;
      } else {
        newOrderValue = 0;
      }
    }

    updatesToApply.columnId = newColumnId;
    updatesToApply.order = newOrderValue;

    // Add to new column
    await Column.findByIdAndUpdate(newColumnId, {
      $push: { jobApplications: id },
    });
  } else if (order !== undefined && order !== null) {
    // Reordering within same column
    const otherJobsInColumn = await JobApplication.find({
      columnId: currentColumnId,
      _id: { $ne: id },
    })
      .sort({ order: 1 })
      .lean();

    const currentJobOrder = jobApplication.order || 0;

    const currentPositionIndex = otherJobsInColumn.findIndex(
      (job) => job.order > currentJobOrder
    );

    const oldPositionIndex =
      currentPositionIndex === -1
        ? otherJobsInColumn.length
        : currentPositionIndex;

    const newOrderValue = order * 100;

    if (order < oldPositionIndex) {
        // Moving up - shift jobs down
      const jobsToShiftDown = otherJobsInColumn.slice(order, oldPositionIndex);

      for (const job of jobsToShiftDown) {
        await JobApplication.findByIdAndUpdate(job._id, {
          $set: { order: job.order + 100 },
        });
      }
    } else if (order > oldPositionIndex) {
        // Moving down - shift jobs up
      const jobsToShiftUp = otherJobsInColumn.slice(oldPositionIndex, order);

      for (const job of jobsToShiftUp) {
        const newOrder = Math.max(0, job.order - 100);
        await JobApplication.findByIdAndUpdate(job._id, {
          $set: { order: newOrder },
        });
      }
    }

    updatesToApply.order = newOrderValue;
  }

  const updated = await JobApplication.findByIdAndUpdate(id, updatesToApply, {
    new: true,
  });

  revalidatePath("/dashboard");

  return { data: JSON.parse(JSON.stringify(updated)) };
}

export async function deleteJobApplication( id: string) {
    const session = await getSession();

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    await connectDB();

    const jobApplication = await JobApplication.findById(id);

    if (!jobApplication) {
        throw new Error("Job Application not found");
    }

    if (jobApplication.userId.toString() !== session.user.id) {
        throw new Error("Unauthorized");
    }

    
    await Column.findByIdAndUpdate(jobApplication.columnId, {
      $pull: { jobApplications: id }
    });

    //we cam do by this
    // await JobApplication.findByIdAndDelete(id);

    //or by this
    await JobApplication.deleteOne({ _id: id });

    revalidatePath("/dashboard");

    return { message: "Job Application deleted successfully" }; 

}