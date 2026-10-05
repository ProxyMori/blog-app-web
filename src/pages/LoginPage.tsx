import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLogin from "@/hooks/auth/useLogin";
import { loginSchema, type LoginSchema } from "@/Schema/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function LoginPage() {
  const { register, handleSubmit, formState } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useLogin();

  const handleLogin = async (values: LoginSchema) => {
    mutate(values);
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

        <Button type="submit" disabled={isPending}>
          {isPending ? "Loading" : "Login"}
        </Button>
      </div>
    </form>
  );
}

export default LoginPage;
