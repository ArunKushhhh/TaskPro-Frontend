import type {
  ProjectStatusData,
  StatsCardProps,
  TaskPriorityData,
  TaskTrendsData,
  WorkspaceProductivityData,
} from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChartBarBig, ChartLine, ChartPie } from "lucide-react";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

interface StatisticsChartsProps {
  stats: StatsCardProps;
  taskTrendsData: TaskTrendsData[];
  projectStatusData: ProjectStatusData[];
  taskPriorityData: TaskPriorityData[];
  workspaceProductivityData: WorkspaceProductivityData[];
}

const StatisticsCharts = ({
  stats,
  taskTrendsData,
  projectStatusData,
  taskPriorityData,
  workspaceProductivityData,
}: StatisticsChartsProps) => {
  console.log(stats);
  console.log(taskTrendsData);
  console.log(projectStatusData);
  console.log(taskPriorityData);
  console.log(workspaceProductivityData);

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
      <Card className="lg:col-span-2 hover:translate-y-1 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-medium">Task Trends</CardTitle>
            <CardDescription>Daily task status changes</CardDescription>
          </div>
          <ChartLine className="size-5 text-muted-foreground" />
        </CardHeader>
        <CardContent className="w-full overflow-x-auto md:overflow-x-hidden">
          <div className="min-w-[350px]">
            <ChartContainer
              config={{
                completed: { color: "#10b981" },
                inProgress: { color: "#f59e0b" },
                todo: { color: "#3b82f6" },
              }}
            >
              <LineChart data={taskTrendsData}>
                <XAxis
                  dataKey={"name"}
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />

                <CartesianGrid strokeDasharray={"3 3"} vertical={false} />
                <ChartTooltip />

                <Line
                  type={"monotone"}
                  dataKey={"completed"}
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />

                <Line
                  type={"monotone"}
                  dataKey={"inProgress"}
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />

                <Line
                  type={"monotone"}
                  dataKey={"todo"}
                  stroke="#6b7280"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />

                <ChartLegend content={<ChartLegendContent />} />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* project status */}

      <Card className="hover:translate-y-1 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-medium">
              Project Status
            </CardTitle>
            <CardDescription>Project Status Breakdown</CardDescription>
          </div>

          <ChartPie className="size-5 text-muted-foreground" />
        </CardHeader>

        <CardContent className="w-full overflow-x-auto md:overflow-x-hidden">
          <div className="min-w-[350px]">
            <ChartContainer
              className="h-[300px]"
              config={{
                Completed: { color: "#10b981" },
                "In Progress": { color: "#3b82f6" },
                Planning: { color: "#f5920b" },
              }}
            >
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx={"50%"}
                  cy={"50%"}
                  dataKey={"value"}
                  nameKey={"name"}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  labelLine={false}
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip />
                <ChartLegend content={<ChartLegendContent />} />
              </PieChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* task priority */}
      <Card className="hover:translate-y-1 duration-300 transition-all">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-0.5">
            <CardTitle className="font-medium text-base">
              Task Priority
            </CardTitle>
            <CardDescription>Task Priority Breakdown</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="w-full overflow-x-auto md:overflow-x-hidden">
          <div className="min-w-[350px]">
            <ChartContainer
              className="h-[300px]"
              config={{
                High: { color: "#ef4444" },
                Medium: { color: "#f59e0b" },
                Low: { color: "#6b7280" },
              }}
            >
              <PieChart>
                <Pie
                  dataKey={"value"}
                  data={taskPriorityData}
                  cx={"50%"}
                  cy={"50%"}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  nameKey={"name"}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {taskPriorityData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip />
                <ChartLegend content={<ChartLegendContent />} />
              </PieChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* workspace productivity */}
      <Card className="hover:translate-y-1 transition-all duration-300 lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-medium">
              Workspace Productivity
            </CardTitle>
            <CardDescription>Task completion by projects</CardDescription>
          </div>
          <ChartBarBig className="size-5 text-muted-foreground" />
        </CardHeader>

        <CardContent className="w-full overflow-x-auto md:overflow-x-hidden">
          <div className="min-w-[350px]">
            <ChartContainer
              className="h-[300px]"
              config={{
                completed: { color: "#3b82f6" },
                total: { color: "red" },
              }}
            >
              <BarChart
                data={workspaceProductivityData}
                barGap={4}
                barSize={20}
              >
                <XAxis
                  dataKey={"name"}
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey={"total"}
                  fill="#000"
                  radius={[0, 0, 0, 0]}
                  name={"Total Tasks"}
                />
                <Bar
                  dataKey={"completed"}
                  fill="#3b82f6"
                  radius={[0, 0, 0, 0]}
                  name={"Completed Tasks"}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsCharts;
