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
        setErrorMessage(error.response?.data?.message || "");
      }
    }
    LoggedIn();
  };

  return (
    <>
      <header className="bg-[#0d1117] text-white flex items-center justify-between py-4 px-8 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <span className="font-bold text-xl">Connect</span>
        </div>

        <button
          onClick={() => {
            navigate("/register");
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Register
        </button>
      </header>
      <section>
        <main className="flex min-h-screen items-center justify-center bg-[#0d1117] text-white p-4">
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
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email input field */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Email
                </label>
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full rounded-md border-[#30363d] bg-[#0d1117] px-4 py-2  focus:border-blue-500 border-2 outline-none"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
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
                    onClick={() => {
                      alert(
                        "lado kha muji eauta password pani yaad garnu sakdinas"
                      );
                    }}
                    className="text-sm font-medium text-blue-500 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-4 py-2 text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* Sign In button */}
              <button
                type="submit"
                className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white transition duration-200 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-600 focus:ring-opacity-50"
              >
                Sign In
              </button>
            </form>
            <small className="block mt-4 mb-2">
              Don't have an Account:{" "}
              <NavLink
                to="/register"
                className="font-bold text-blue-600 text-[1rem] underline"
              >
                Register
              </NavLink>
            </small>
            <p className="text-xl text-red-500">{errorMessage}</p>
          </section>
        </main>
      </section>
    </>
  );
};

export default Login;
