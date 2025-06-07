import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { CheckCircle, Loader, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVerifyEmailMutation } from "@/hooks/useAuth";
import { toast } from "sonner";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate, isPending: isVerifying } = useVerifyEmailMutation();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setIsSuccess(false);
      console.error("No token provided in the URL");
      return;
    } else {
      mutate(
        { token },
        {
          onSuccess: () => {
            setIsSuccess(true);
          },
          onError: (error: any) => {
            const errorMessage =
              error.response?.data?.message || "An error occurred";
            setIsSuccess(false);
            console.log(error);

            toast.error(`Email verification failed: ${errorMessage}`);
          },
        }
      );
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Verify Email</h1>
      <p className="text-sm text-gray-500">Verifying your email...</p>

      <Card className="w-full max-w-md mt-2">
        {/* <CardHeader className="text-center">
          <Link
            to="/sign-in"
            className="flex gap-2 text-blue-500 hover:underline text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </CardHeader> */}

        <CardContent>
          <div className="flex flex-col items-center justify-center py-6">
            {isVerifying ? (
              <>
                <Loader className="w-10 h-10 text-gray-500 animate-spin" />
                <h3>Verifying email...</h3>
                <p className="text-sm text-gray-500">
                  Please wait while we are verifying your email
                </p>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle className="w-10 h-10 text-green-500" />
                <h3 className="text-lg font-semibold mt-4">
                  Email Verified Successfully!
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  You can now sign in with your verified email.
                </p>
                <Link
                  to="/sign-in"
                  className="text-blue-500 hover:underline text-sm mt-6"
                >
                  <Button variant="outline">Back to Sign In</Button>
                </Link>
              </>
            ) : (
              <>
                <XCircle className="w-10 h-10 text-red-500" />
                <h3 className="text-lg font-semibold mt-4">
                  Email Verification Failed
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Please check the link or try again later.
                </p>

                <Link
                  to="/sign-in"
                  className="text-blue-500 hover:underline text-sm mt-6"
                >
                  <Button variant="outline">Back to Sign In</Button>
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
