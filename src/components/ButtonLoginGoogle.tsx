import { useGoogleLogin } from "@react-oauth/google";
import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@/stores/useAuth";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "./ui/button";

function ButtonLoginGoogle() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLoginGoogle = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      try {
        const response = await axiosInstance.post("/auth/google", {
          accessToken: access_token,
        });

        login({
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          role: response.data.user.role,
          profilePic: response.data.user.profilePic,
          accessToken: response.data.accessToken,
        });

        navigate("/");
      } catch (error) {
        toast.error("Login with Google Failed!");
      }
    },
  });

  return (
    <Button type="button" variant="outline" onClick={() => handleLoginGoogle()}>
      Login By Google
    </Button>
  );
}

export default ButtonLoginGoogle;
