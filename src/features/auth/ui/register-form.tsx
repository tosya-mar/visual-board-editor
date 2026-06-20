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
import { useRegister } from "../model/use-register";

const registerSchema = z
  .object({
    email: z.string().nonempty("Email обязателен").email("Неверный email"),
    password: z
      .string()
      .nonempty("Пароль обязателен")
      .min(6, "Пароль должен быть не менее 6 символов"),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают",
  });

export default function RegisterForm() {
  const { register, errorMessage, isPending } = useRegister();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <form
      id="register-form"
      onSubmit={form.handleSubmit(register)}
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
                aria-invalid={fieldState.invalid}
                placeholder="admin@gmail.com"
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
                aria-invalid={fieldState.invalid}
                placeholder="********"
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Повторите пароль</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="********"
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {errorMessage && (
          <p className="text-destructive text-sm">{errorMessage}</p>
        )}

        <Button disabled={isPending} type="submit" form="register-form">
          Зарегистрироваться
        </Button>
      </FieldGroup>
    </form>
  );
}
