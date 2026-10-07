import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useResetPassword from "@/hooks/auth/useResetPassword";
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "@/Schema/resetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosedIcon, EyeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const { mutate, isPending } = useResetPassword(token!);

  async function onSubmit(data: ResetPasswordSchema) {
    mutate(data);
  }

  return (
    <div>
      <h1>Reset Password Page</h1>

      <Card className="w-full sm:max-w-md m-auto">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Help us improve by reporting bugs you encounter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-reset-password" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-password">Password</FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="form-password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Your password"
                        autoComplete="off"
                        type={showPassword ? "text" : "password"}
                      />

                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <HugeiconsIcon
                          icon={showPassword ? EyeClosedIcon : EyeIcon}
                          size={24}
                          color="currentColor"
                          strokeWidth={1.5}
                        />
                      </Button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-confirm-password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Your confirm password"
                      autoComplete="off"
                      type="password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="submit"
              form="form-reset-password"
              disabled={isPending}
            >
              {isPending ? "Loading" : "Submit"}
              Submit
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ResetPassword;
