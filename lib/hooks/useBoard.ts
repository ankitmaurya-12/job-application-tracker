"use client";

import { useEffect, useState } from "react";
import { Board, Column, JobApplication } from "../models/models.types";
import { updateJobApplication } from "../actions/job-applications";

export function useBoard(initialBoard?: Board | null) {
    
    const [board, setBoard] = useState<Board | null>(initialBoard || null);
    const [columns, setColumns] = useState<Column[]>(initialBoard?.columns || []);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialBoard) {
            setBoard(initialBoard);
            setColumns(initialBoard.columns || []);
        }
    }, [initialBoard]); 

    async function moveJob(
        jobApplicationId: string, 
        newColumnId: string, 
        newOrder: number
    ) {
        // It will how the postion where the card will move
        // console.log(jobApplicationId, newColumnId, newOrder);

        // updating the local state for immediate UI response
        setColumns((prev)=>{
            const newColumns = prev.map((col)=>({
                ...col,
                jobApplications: [...(col.jobApplications || [])]
            }));

            // find and remove the job from its current column
            let jobToMove : JobApplication | null = null;
            let oldColumnId : string | null = null;

            for (const col of newColumns) {
                const jobIndex = col.jobApplications?.findIndex((job) => job._id === jobApplicationId);

                if (jobIndex !== -1 && jobIndex !== undefined) {
                    jobToMove = col.jobApplications![jobIndex];
                    oldColumnId = col._id;
                    col.jobApplications = col.jobApplications.filter((job) => job._id !== jobApplicationId);
                    break;
                }
            }
            
            if(jobToMove && oldColumnId) {
                // if this the case then we are moving within the same column
                const targetColumnIndex = newColumns.findIndex((col) => col._id === newColumnId);

                if(targetColumnIndex !== -1){
                    const targetColumn = newColumns[targetColumnIndex];
                    const currentJobs = targetColumn.jobApplications || [];

                    // adjust newOrder if moving within the same column and the job is before the new position
                    const updatedJobs= [...currentJobs];
                    updatedJobs.splice(newOrder, 0, {
                        ...jobToMove,
                        columnId: newColumnId,
                        order: newOrder * 100,
                    });

                    const jobsWithUpdatedOrder = updatedJobs.map((job, index) => ({
                        ...job,
                        order: index * 100,
                    }));

                    newColumns[targetColumnIndex] ={
                        ...targetColumn,
                        jobApplications: jobsWithUpdatedOrder,
                    }
                }
            }

            return newColumns;
            //now after this ui will work but still we need to store it in Db
        })
        
        // API call to update the job application in the backend
        try{
            const response = await updateJobApplication(jobApplicationId, {
                columnId: newColumnId,
                order: newOrder,
            }); 
        }catch (error){
            console.error("Error moving job application:", error);
            setError("Failed to move job application. Please try again.");
        }
    }

    return {
        board, 
        columns, 
        error, 
        moveJob
    };
}