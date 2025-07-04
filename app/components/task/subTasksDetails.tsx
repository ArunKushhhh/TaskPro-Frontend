import type { Subtask } from "@/types";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  useAddSubTaskMutation,
  useUpdateSubTaskMutation,
} from "@/hooks/useTask";
import { toast } from "sonner";

const SubTasksDetails = ({
  subTasks,
  taskId,
}: {
  subTasks: Subtask[];
  taskId: string;
}) => {
  const [newSubTask, setNewSubTask] = useState("");
  const { mutate: addSubTask, isPending } = useAddSubTaskMutation();
  const { mutate: updateSubTask, isPending: isUpdating } =
    useUpdateSubTaskMutation();

  const handleToggleTask = (subTaskId: string, checked: boolean) => {
    updateSubTask(
      {
        taskId,
        subTaskId,
        completed: checked,
      },
      {
        onSuccess: () => {
          toast.success("Sub task updated successfully");
        },
        onError: (error: any) => {
          const errorMessage = error.response.data.message;
          toast.error("Failed to update sub task", errorMessage);
          console.log(error);
        },
      }
    );
  };

  const handleAddSubTask = () => {
    addSubTask(
      { taskId, title: newSubTask },
      {
        onSuccess: () => {
          setNewSubTask("");
          toast.success("Sub Task added successfully");
        },
        onError: (error: any) => {
          const errorMessage = error.response.data.message;
          console.log(error);
          toast.error("Failed to add sub-task", errorMessage);
        },
      }
    );
  };

  return (
    <div className="my-6">
      <h3 className="text-sm font-medium mb-0">Sub Tasks</h3>

      <div className="space-y-2 mb-4">
        {subTasks.length > 0 ? (
          subTasks.map((subTask) => (
            <div key={subTask._id} className="flex items-center space-x-2">
              <Checkbox
                id={subTask._id}
                checked={subTask.completed}
                onCheckedChange={(checked) =>
                  handleToggleTask(subTask._id, !!checked)
                }
                disabled={isUpdating}
              />
              <label
                className={cn(
                  "text-sm",
                  subTask.completed ? "line-through text-muted-foreground" : ""
                )}
              >
                {subTask.title}
              </label>
            </div>
          ))
        ) : (
          <div className="text-sm text-muted-foreground">No sub tasks</div>
        )}
      </div>

      <div className="flex items-center">
        <Input
          placeholder="Add a sub task"
          value={newSubTask}
          onChange={(e) => setNewSubTask(e.target.value)}
          className="mr-1"
          disabled={isPending}
        />

        <Button
          size={"lg"}
          onClick={handleAddSubTask}
          disabled={isPending || newSubTask.length === 0}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default SubTasksDetails;
