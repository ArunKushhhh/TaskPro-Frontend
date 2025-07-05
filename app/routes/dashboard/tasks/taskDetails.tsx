import BackButton from "@/components/backButton";
import Loader from "@/components/loader";
import CommentSection from "@/components/task/commentSection";
import SubTasksDetails from "@/components/task/subTasksDetails";
import TaskActivity from "@/components/task/taskActivity";
import TaskAssigneesSelector from "@/components/task/taskAssigneesSelector";
import TaskDescription from "@/components/task/taskDescription";
import TaskPrioritySelector from "@/components/task/taskPrioritySelector";
import TaskStatusSelector from "@/components/task/taskStatusSelector";
import TaskTitle from "@/components/task/taskTitle";
import Watchers from "@/components/task/watchers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useArchivedTaskMutation,
  useTaskByIdQuery,
  useWatchTaskMutation,
} from "@/hooks/useTask";
import { useAuth } from "@/provider/authContext";
import type { Project, Task } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const TaskDetails = () => {
  const { user } = useAuth();

  const { taskId, projectId, workspaceId } = useParams<{
    taskId: string;
    projectId: string;
    workspaceId: string;
  }>();

  const navigate = useNavigate();

  const { data, isLoading } = useTaskByIdQuery(taskId!) as {
    data: {
      task: Task;
      project: Project;
    };
    isLoading: boolean;
  };

  const { mutate: watchTask, isPending: isWatching } = useWatchTaskMutation();
  const { mutate: archivedTask, isPending: isArchived } =
    useArchivedTaskMutation();

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (!data)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-bold">No Task Found</div>
      </div>
    );

  const { task, project } = data;
  const isUserWatching = task?.watchers?.some(
    (watcher) => watcher._id.toString() === user?._id.toString()
  );

  const goBack = () => navigate(-1);

  const members = task?.assignees || [];

  const handleWatchTask = () => {
    watchTask(
      { taskId: task._id },
      {
        onSuccess: () => {
          toast.success("Task watched");
        },
        onError: () => {
          toast.error("Failed to watch task");
        },
      }
    );
  };

  const handleArchivedTask = () => {
    archivedTask(
      { taskId: task._id },
      {
        onSuccess: () => {
          toast.success("Task archived");
        },
        onError: () => {
          toast.error("Failed to archive task");
        },
      }
    );
  };

  return (
    <div className="container mx-auto p-0 py-4 md:px-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="w-full flex flex-col md:flex-row md:items-center">
          <BackButton />
          <h1 className="text-xl md:text-2xl font-bold">{task.title}</h1>
          {task.isArchived && (
            <Badge className="ml-2" variant={"outline"}>
              Archived
            </Badge>
          )}
        </div>

        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={handleWatchTask}
            className="w-fit"
            disabled={isWatching}
          >
            {isUserWatching ? (
              <>
                <EyeOff className="mr-2 size-4" />
                Unwatch
              </>
            ) : (
              <>
                <Eye className="mr-2 size-4" />
                Watch
              </>
            )}
          </Button>

          <Button
            variant={"outline"}
            size={"sm"}
            onClick={handleArchivedTask}
            className="w-fit"
            disabled={isArchived}
          >
            {task.isArchived ? "Unarchive" : "Archive"}
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full">
          <div className="bg-card rounded-lg p-6 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start mb-4">
              <div>
                <Badge
                  variant={
                    task.priority === "High"
                      ? "destructive"
                      : task.priority === "Medium"
                      ? "default"
                      : "outline"
                  }
                  className="mb-2 capitalize"
                >
                  Priority: {task.priority}
                </Badge>

                <TaskTitle title={task.title} taskId={task._id} />

                <div className="text-sm text-muted-foreground">
                  Created at:{" "}
                  {formatDistanceToNow(new Date(task.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <TaskStatusSelector status={task.status} taskId={task._id} />

                <Button
                  variant={"destructive"}
                  size={"sm"}
                  onClick={() => {}}
                  className="hidden md:block"
                >
                  Delete Task
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-0">Description</h3>
              <TaskDescription
                description={task.description || ""}
                taskId={task._id}
              />
            </div>

            <TaskAssigneesSelector
              task={task}
              assignees={task.assignees}
              projectMembers={project.members as any}
            />

            <TaskPrioritySelector priority={task.priority} taskId={task._id} />

            <SubTasksDetails subTasks={task.subtasks || []} taskId={task._id} />
          </div>

          <CommentSection taskId={task._id} members={project.members as any} />
        </div>

        <div className="lg:w-[40%]">
          <Watchers watchers={task.watchers || []} />

          <TaskActivity resourceId={task._id} />
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
