"use client";

import { Board, Column, JobApplication } from "@/lib/models/models.types";
import { Award, Calendar, CheckCircle2, Mic, MoreVertical, Trash2, XCircle } from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import CreateJobApplicationDialog from "./jobApplicationDialog";
import JobApplicationCard from "./Job-application-card";

interface KanbanBoardProps {
  board: Board;
  userId: string;
}

interface colConfig{
  color: string; icon: React.ReactNode

}
const COLUMN_CONFIG: Array<colConfig> = [
  {
    color: "bg-cyan-500",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    color: "bg-purple-500",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    color: "bg-green-500",
    icon: <Mic className="h-4 w-4" />,
  },
  {
    color: "bg-yellow-500",
    icon: <Award className="h-4 w-4" />,
  },
  {
    color: "bg-red-500",
    icon: <XCircle className="h-4 w-4" />,
  },
];

function DroppableColumn({
  column,
  config,
  boardId,
  sortedColumns
}: {
  column: Column;
  config: colConfig;
  boardId: string;
  sortedColumns: Column[];
}) {
  // console.log(column)

  const sortedJobs = column.jobApplications?.sort((a, b) => a.order - b.order) || [];

  return (
  <Card className="min-w-[300px] flex-shrink-0 shadow-md p-0">
    <CardHeader className={`${config.color} text-white rounded-t-3xl pb-3 pt-3`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {config.icon}
          <CardTitle className="text-white text-base font-semibold">{column.name}</CardTitle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:bg-white/20">
              <MoreVertical className="h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4"/>
              Delete Column
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardHeader>

    <CardContent className="space-y-4 bg-gray-50/50 min-h-[400px] rounded-b-3xl p-4">

      {sortedJobs.map((job, key) => (
        <SortableJobCard 
        key={key} 
        job={{...job, columnId: job.columnId || column._id}}
        columns={sortedColumns}
        />
      ))}
       
      <CreateJobApplicationDialog columnId={column._id} boardId={boardId} />
    </CardContent>
  </Card>
  );
}

function SortableJobCard({job, columns}: {job:JobApplication, columns: Column[]}) {

  return (
    <div>
      <JobApplicationCard job={job} columns={columns}/>
    </div>
  );
}


function KabanBoard({ board, userId }: KanbanBoardProps) {
  const columns = board.columns;

  // console.log("Rendering Kanban Board for user: ", userId);
  // console.log(columns[0].jobApplications);

  const sortedColumns = columns?.sort((a, b) => a.order - b.order) || [];

  return (
    <>
    <div className="">
      <div>
        {columns.map((col, key) => {
          const config = COLUMN_CONFIG[key] || {
            color: "bg-gray-500",
            icon: <Calendar className="h-4 w-4" />,
          };
          return (
            <DroppableColumn
              key={key}
              column={col}
              config={config}
              boardId={board._id}
              sortedColumns={sortedColumns}
              />
            );
          })}
      </div>
    </div>
    </>
  );
}

export default KabanBoard;
