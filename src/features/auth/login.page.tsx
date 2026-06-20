import AuthLayout from "./ui/auth-layout";
import { Link } from "react-router-dom";
import { ROUTES } from "@shared/model/routes";
import LoginForm from "./ui/login-form";

function LoginPage() {
  return (
    <AuthLayout
      title="Вход в систему"
      description="Введите ваш email и пароль для входа в систему"
      form={<LoginForm />}
      footer={
        <div>
          Если у вас нет аккаунта,{" "}
          <Link to={ROUTES.REGISTER} className="text-primary underline">
            Зарегистрируйтесь
          </Link>
        </div>
      }
    />
  );
}

export const Component = LoginPage;
