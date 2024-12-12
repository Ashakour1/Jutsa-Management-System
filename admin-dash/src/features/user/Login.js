import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import useUserStore from "../../stores/userStore";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(formData);
  const { login } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    login(formData);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-[500px] max-w-5xl  shadow-xl">
        <div className="py-24 px-10">
          <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 pt-4">
              <label className="text-black text-sm font-medium">Email</label>
              <input
                className="w-full p-3 border text-sm rounded"
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2 pt-3">
              <label className="text-black text-sm font-medium ">
                Password
              </label>
              <input
                className="w-full p-3 border text-sm  rounded"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>

            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
            <button type="submit" className="btn mt-2 w-full btn-primary">
              Login
            </button>

            <div className="text-center mt-4">
              Don't have an account yet?{" "}
              <Link to="/register">
                <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                  Register
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
