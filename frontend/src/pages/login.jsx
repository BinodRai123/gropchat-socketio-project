import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../store/actions/userAction";
import { useContext, useState } from "react";
import { context } from "../wrapper";
import axios from "../utils/axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useContext(context);

  const onSubmit = async (data) => {
    async function LoggedIn() {
      try {
        await loginUser(data);
        const response = await axios.get("/api/auth/me");
        setUser(response.data.id.id);
        navigate("/chat");
      } catch (error) {
        console.log(error);
      }
    }
    LoggedIn();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <small>
          Don't have an Account:{" "}
          <NavLink to="/register" className="text-blue-800 text-sm underline">
            Register
          </NavLink>
        </small>
        <p className="text-xl text-red-500">{errorMessage}</p>
      </div>
    </div>
  );
};

export default Login;
