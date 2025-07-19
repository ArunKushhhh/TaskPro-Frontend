import type { StatsCardProps } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const StatsCard = ({ data }: { data: StatsCardProps }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="hover:translate-y-1 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalProjects}</div>
          <p className="text-sm font-medium">
            In progress: {data.totalProjectInProgress}
          </p>
        </CardContent>
      </Card>

      <Card className="hover:translate-y-1 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalTasks}</div>
          <p className="text-sm font-medium">
            Completed: {data.totalTasksCompleted}
          </p>
        </CardContent>
      </Card>

      <Card className="hover:translate-y-1 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">To Do</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalTaskToDo}</div>
          <p className="text-sm text-muted-foreground">
            Tasks waiting to be done
          </p>
        </CardContent>
      </Card>

      <Card className="hover:translate-y-1 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">In progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalTaskInProgress}</div>
          <p className="text-sm text-muted-foreground">
            Tasks currently in progress
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCard;
