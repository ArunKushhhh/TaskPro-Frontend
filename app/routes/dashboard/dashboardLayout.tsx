import { Button } from "@/components/ui/button";
import { useAuth } from "@/provider/authContext";

const DashboardLayout = () => {
  const {user, logout} = useAuth();
  return <div className="h-screen flex justify-center items-center">
    <Button onClick={logout}>Logout</Button>
  </div>;
};

export default DashboardLayout;
