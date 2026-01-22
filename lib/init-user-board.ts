import connectDB from "./db";
import {Board, Column} from "./models"

const DEFAULT_COLUMNS = [
    {
        name: "Wish List",
        order: 0,
    },
    {
        name: "Applied",
        order: 1,
    },
    {
        name: "Interviewing",
        order: 2,
    },
    {
        name: "Offers",
        order: 3,
    },
    {
        name: "Rejected",
        order: 4,
    }
]

export async function initializeUserBoard(userId: string){
    try{

       // Connect to the database
    await connectDB();

    // Check if board already exists for the user
    const existingBoard = await Board.findOne({ userId });

        if(existingBoard){
            return existingBoard;
        }

        // Create a new board for the user
        const board = await Board.create({
            name: "Job Hunt",
            userId,
            columns: [],
        });

        // Create default columns
        const colums = await Promise.all(
            DEFAULT_COLUMNS.map((col)=>{
                return Column.create({
                    name: col.name,
                    order: col.order,
                    boardId: board._id,
                    jobApplication: [],
                })
            })
        );

        // Update board with the created new column IDs
        board.columns = colums.map((col)=> col._id);


        await board.save();

        return board;

    }catch(err){
        console.error("Error initializing user board:", err);
        throw err;
    }
}