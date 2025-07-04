import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/auth/authLayout.tsx", [
    index("routes/root/home.tsx"),
    route("sign-in", "routes/auth/signIn.tsx"),
    route("sign-up", "routes/auth/signUp.tsx"),
    route("forgot-password", "routes/auth/forgotPassword.tsx"),
    route("reset-password", "routes/auth/resetPassword.tsx"),
    route("verify-email", "routes/auth/verifyEmail.tsx"),
  ]),

  layout("routes/dashboard/dashboardLayout.tsx", [
    route("dashboard", "routes/dashboard/index.tsx"),
    route("workspaces", "routes/dashboard/workspaces/index.tsx"),
    route(
      "workspaces/:workspaceId",
      "routes/dashboard/workspaces/workspaceDetails.tsx"
    ),
    route(
      "workspaces/:workspaceId/projects/:projectId",
      "routes/dashboard/projects/projectDetails.tsx"
    ),
    route(
      "workspaces/:workspaceId/projects/:projectId/tasks/:taskId",
      "routes/dashboard/tasks/taskDetails.tsx"
    ),
  ]),
] satisfies RouteConfig;
