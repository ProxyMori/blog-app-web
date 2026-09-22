import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { axiosInstance } from "@/lib/axios";
import { loginSchema, type LoginSchema } from "@/Schema/login";
import useAuth from "@/stores/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { login } = useAuth();

  const { register, handleSubmit, formState } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (values: LoginSchema) => {
    setIsLoading(true);

    try {
      const { data } = await axiosInstance.post("/users/login", {
        login: values.email,
        password: values.password,
      });

      login({
        name: data.name,
        email: data.email,
        objectId: data.objectId,
        token: data["user-token"],
      });

      alert("Login Success!");
    } catch (error) {
      console.log(error);
      alert("Login Failed!");
    } finally {
      setIsLoading(false);
    }
  };

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

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading" : "Login"}
        </Button>
      </div>
    </form>
  );
}

export default LoginPage;
