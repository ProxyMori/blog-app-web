import { axiosInstance } from "@/lib/axios";
import type { ForgotPasswordSchema } from "@/Schema/forgot-password";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";

function useForgotPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (values: ForgotPasswordSchema) => {
      await axiosInstance.post("/auth/forgot-password", {
        email: values.email,
      });
    },

    onSuccess: () => {
      toast.success("Send email success!");
      navigate("/");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Send email failed!");
    },
  });
}

export default useForgotPassword;
