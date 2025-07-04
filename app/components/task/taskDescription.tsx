import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { useUpdateTaskDescriptionMutation } from "@/hooks/useTask";
import { toast } from "sonner";

const TaskDescription = ({
  description,
  taskId,
}: {
  description: string;
  taskId: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(description);

  const { mutate, isPending } = useUpdateTaskDescriptionMutation();

  const updateDescription = () => {
    mutate(
      { taskId, description: newDescription },
      {
        onSuccess: () => {
          setIsEditing(false);
          toast.success("Description updated succesfully");
        },
        onError: (error: any) => {
          const errorMessage = error.response.data.message;
          toast.error("Failed to update description", errorMessage);
          console.log(error);
        },
      }
    );
  };

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <Textarea
          className="w-full min-w-3xl"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          disabled={isPending}
        />
      ) : (
        <div className="text-sm text-pretty flex-1 text-muted-foreground">
          {description}
        </div>
      )}

      {isEditing ? (
        <Button onClick={updateDescription} disabled={isPending}>
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

export default TaskDescription;
