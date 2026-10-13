import ButtonLoginGoogle from "@/components/ButtonLoginGoogle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLogin from "@/hooks/auth/useLogin";
import { axiosInstance } from "@/lib/axios";
import { loginSchema, type LoginSchema } from "@/Schema/login";
import { useAuth } from "@/stores/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function LoginPage() {
  const { register, handleSubmit, formState } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useLogin();

  const handleLogin = async (values: LoginSchema) => {
    mutate(values);
  };

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
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="w-[400px] mx-auto mt-20 border border-black p-8 space-y-4">
        <h1>LoginPage</h1>

        <Label>Email</Label>
        <Input type="email" {...register("email")} />

        {formState.errors.email && <p>{formState.errors.email.message}</p>}

        <Label>Password</Label>
        <Input type="password" {...register("password")} />

        {formState.errors.password && (
          <p>{formState.errors.password.message}</p>
        )}

        <Button type="submit" disabled={isPending}>
          {isPending ? "Loading" : "Login"}
        </Button>

        <ButtonLoginGoogle />
      </div>
    </form>
  );
}

export default LoginPage;
