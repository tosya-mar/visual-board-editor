import { Button } from "@shared/ui/kit/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@shared/ui/kit/field";
import { Input } from "@shared/ui/kit/input";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../model/use-login";

const loginSchema = z.object({
  email: z.string().nonempty("Email обязателен").email("Неверный email"),
  password: z
    .string()
    .nonempty("Пароль обязателен")
    .min(6, "Пароль должен быть не менее 6 символов"),
});

export default function LoginForm() {
  const { login, errorMessage, isPending } = useLogin();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@gmail.com", // TODO: remove this later
      password: "123456", // TODO: remove this later
    },
  });

  return (
    <form
      id="login-form"
      onSubmit={form.handleSubmit(login)}
      className="flex flex-col gap-4 justify-center items-center"
    >
      <FieldGroup>
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Email</FieldLabel>
              <Input
                {...field}
                value="admin@gmail.com" // TODO: remove this later
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="admin@gmail.com"
                type="email"
                name="email"
              />
              {fieldState.invalid && (
                <FieldError
                  errors={[fieldState.error]}
                  className="items-start"
                />
              )}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Пароль</FieldLabel>
              <Input
                {...field}
                value="123456" // TODO: remove this later
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="********"
                type="password"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {errorMessage && (
          <p className="text-destructive text-sm">{errorMessage}</p>
        )}

        <Button disabled={isPending} type="submit" form="login-form">
          Войти
        </Button>
      </FieldGroup>
    </form>
  );
}
