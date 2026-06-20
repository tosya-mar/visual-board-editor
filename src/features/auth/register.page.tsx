import { ROUTES } from "@shared/model/routes";
import { Link } from "react-router-dom";
import AuthLayout from "./ui/auth-layout";
import RegisterForm from "./ui/register-form";

function RegisterPage() {
  return (
    <AuthLayout
      title="Зарегистрироваться"
      description="Введите ваш email и пароль для регистрации"
      form={<RegisterForm />}
      footer={
        <div>
          Если у вас уже есть аккаунт,{" "}
          <Link to={ROUTES.LOGIN} className="text-primary underline">
            Войдите
          </Link>
        </div>
      }
    />
  );
}

export const Component = RegisterPage;
