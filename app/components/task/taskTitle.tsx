import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { useUpdateTaskTitleMutation } from "@/hooks/useTask";
import { toast } from "sonner";

const TaskTitle = ({ title, taskId }: { title: string; taskId: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const { mutate, isPending } = useUpdateTaskTitleMutation();

  const updateTitle = () => {
    mutate(
      {
        taskId,
        title: newTitle,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          toast.success("Title updated successfully");
        },
        onError: (error: any) => {
          const errorMessage = error.response.data.message;
          toast.error("Error updating task title", errorMessage);
          console.log(error);
        },
      }
    );
  };

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <Input
          className="text-xl! font-semibold w-full min-w-3xl"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          disabled={isPending}
        />
      ) : (
        <h2 className="text-xl font-semibold flex-1">{title}</h2>
      )}

      {isEditing ? (
        <Button onClick={updateTitle} disabled={isPending}>
          Save
        </Button>
      ) : (
        <Edit
          className="size-4 cursor-pointer"
          onClick={() => setIsEditing(true)}
        />
      )}
    </div>
  );
};

export default TaskTitle;
