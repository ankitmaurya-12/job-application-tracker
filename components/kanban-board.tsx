"use client";

import { Board, Column, JobApplication } from "@/lib/models/models.types";
import { Award, Calendar, CheckCircle2, Mic, MoreVertical, Trash2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import CreateJobApplicationDialog from "./jobApplicationDialog";
import JobApplicationCard from "./Job-application-card";
import { useBoard } from "@/lib/hooks/useBoard";
import { closestCorners, DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

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

  // code for DroppableColumn component comes from Dnd-kit documentation
  const {setNodeRef, isOver} = useDroppable({
    id: column._id,
    data:{
      type: 'column',
      columnId : column._id,
    }
  })
  
  
  // console.log(column)

  const sortedJobs = column.jobApplications?.sort((a, b) => a.order - b.order) || [];

  return (
  <Card className="max-w-[300px] min-w-[250px] flex-shrink-0 shadow-md p-0">
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

    <CardContent 
    //the ref is important for dnd-kit to know where the droppable area is
    ref={setNodeRef}
    className={`space-y-4 bg-gray-50/50 min-h-[400px] rounded-b-3xl p-4 ${isOver ? 'ring-2 bg-blue-500' : ''}`}
    >

      <SortableContext items={sortedJobs.map((job)=>job._id)} strategy={verticalListSortingStrategy}>

      {sortedJobs.map((job, key) => (
        <SortableJobCard 
        key={key} 
        job={{...job, columnId: job.columnId || column._id}}
        columns={sortedColumns}
        />
      ))}
      </SortableContext>
       
      <CreateJobApplicationDialog columnId={column._id} boardId={boardId} />
    </CardContent>
  </Card>
  );
}

function SortableJobCard({job, columns}: {job:JobApplication, columns: Column[]}) {

    // it comes from dnd-kit documentation
    const {attributes, listeners, transform, transition, isDragging, setNodeRef} = useSortable({
      id: job._id,
      data:{
        type: 'job',
        job,
      }
    })

    // for styling the dragging item
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <JobApplicationCard job={job} columns={columns} dragHandleProps={{...attributes,...listeners}}/>
    </div>
  );
}


function KabanBoard({ board, userId }: KanbanBoardProps) {
  // const columns = board.columns;

  // console.log("Rendering Kanban Board for user: ", userId);
  // console.log(columns[0].jobApplications);

  // to track the active dragged item
  const [activeId, setActiveId] = useState<string | null>(null);

  // Sort columns by order
  const {columns, moveJob} = useBoard(board);

  const sortedColumns = columns?.sort((a, b) => a.order - b.order) || [];

  const sensors = useSensors(useSensor(PointerSensor,{
    activationConstraint: {
      distance: 8,
    },
  }))

  async function handleDragStart(event: DragStartEvent){
    setActiveId(event.active.id as string);
  }

  async function handleDragEnd(event: DragEndEvent){
    const {active, over} = event;

    setActiveId(null);

    if(!over || !board._id) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Moving job application
    let draggedJob: JobApplication | null = null;
    let sourceColumn: Column | null = null;
    let sourceIndex = -1;

    for(const column of sortedColumns){
      const jobs = column.jobApplications.sort((a,b) => a.order - b.order) || [];
      const jobIndex = jobs.findIndex((j) => j._id === activeId);
      if(jobIndex !== undefined && jobIndex > -1){
        draggedJob = jobs[jobIndex];
        sourceColumn = column;
        sourceIndex = jobIndex;
        break;
      }
    }

    if(!draggedJob || !sourceColumn) return;

    // check if dropped in a column or on another job
    const targetColumn = sortedColumns.find((col)=> col._id === overId);
    const targetJob = sortedColumns.flatMap(col=> col.jobApplications || []).find((job)=> job._id === overId);


    let targetColumnId: string;
    let newOrder : number;

    if(targetColumn){
      targetColumnId = targetColumn._id;
      const jobsInTarget = targetColumn.jobApplications.filter((j)=> j._id !== activeId).sort((a,b) => a.order - b.order) || [];
      newOrder = jobsInTarget.length;

    }else if(targetJob){
      const targetJobColumn =sortedColumns.find((col)=> col.jobApplications.some((j)=> j._id === targetJob._id));

      targetColumnId = targetJob.columnId || targetJobColumn._id || "" ;

      if(!targetColumnId) return;

      const targetColumnObj = sortedColumns.find((col)=>col._id === targetColumnId);

      if(!targetColumnObj) return;

      const allJobsTargetOriginal = targetColumnObj.jobApplications.sort((a,b) => a.order - b.order) || [];
      
      const allJobsInTargetFiltered = allJobsTargetOriginal.filter((j)=> j._id !== activeId || []);

      const targteIndexInOriginal = allJobsTargetOriginal.findIndex((j)=> j._id === overId);

      const targteIndexInFiltered = allJobsInTargetFiltered.findIndex((j)=> j._id === overId);

      if(targteIndexInFiltered !== -1) {
        if(sourceColumn._id === targetColumnId){
          if(sourceIndex < targteIndexInOriginal){
            newOrder = targteIndexInFiltered +1;
          }else{
            newOrder = targteIndexInFiltered;
          }
        }else{
          newOrder = targteIndexInFiltered
        }
      }else{
        newOrder = allJobsInTargetFiltered.length;
      }
    }else{
      // dropped outside any valid target
      return;
    }

    if(!targetColumnId) {
      return;
    }

    // Call moveJob to update state and backend
    await moveJob(activeId, targetColumnId, newOrder);
    
  }

  const activeJob = sortedColumns.flatMap(col=> col.jobApplications || []).find((job)=> job._id === activeId);

  return (
    <DndContext sensors={sensors} 
    collisionDetection={closestCorners} 
    onDragStart={handleDragStart} 
    onDragEnd={handleDragEnd}
    >
      <div className="space-y-4">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {sortedColumns.map((col, key) => {
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

      {/* It is to make UI smoother by */}
      <DragOverlay>
        {activeId ?(
          <div className="opacity-50">
            <JobApplicationCard job={activeJob} columns={sortedColumns} />
          </div>
        ): null}
      </DragOverlay>
    </DndContext>
  );
}

export default KabanBoard;
