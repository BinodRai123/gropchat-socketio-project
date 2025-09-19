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
    <main className="flex min-h-screen items-center justify-center bg-[#0d1117] text-white p-4">
      {/* Container for the form */}
      <section className="w-full max-w-sm rounded-lg bg-[#161b22] p-8 shadow-xl md:max-w-md lg:max-w-lg">
        {/* Header section */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-white">
            Sign in to your account
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Welcome back! Please enter your details.
          </p>
        </header>

        {/* Form section */}
        <form>
          {/* Email input field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-4 py-2 text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              autoComplete="email"
            />
          </div>

          {/* Password input field */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <a
                href="#"
                className="text-sm font-medium text-blue-500 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-4 py-2 text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              autoComplete="current-password"
            />
          </div>

          {/* Sign In button */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white transition duration-200 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-600 focus:ring-opacity-50"
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
// <small>
//   Don't have an Account:{" "}
//   <NavLink to="/register" className="text-blue-800 text-sm underline">
//     Register
//   </NavLink>
// </small>
// <p className="text-xl text-red-500">{errorMessage}</p>
