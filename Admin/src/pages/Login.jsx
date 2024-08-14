import { Outlet } from "react-router-dom";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <div className="max-w-md flex justify-center items-center mx-auto min-h-screen">
      <LoginForm />
    </div>
  );
}

export default Login;
