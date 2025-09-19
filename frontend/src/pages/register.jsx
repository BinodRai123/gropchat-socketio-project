import { useContext, useState } from "react";
import { context } from "../wrapper";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../store/actions/userAction";
import axios from "../utils/axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useContext(context);

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      const res = await axios.get("/api/auth/me");
      setUser(res.data.id.id);
      navigate("/chat");
      reset();
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white font-sans">
      {/* Header */}
      <header className="flex items-center justify-between py-4 px-8 border-b border-gray-700">
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

        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Sign In
        </button>
      </header>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center p-4">
        <section className="p-8 bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
          <header className="mb-6 text-center">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="mt-2 text-gray-400">
              Join the conversation and connect with others.
            </p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}

            <input
              {...register("userName", { required: "Username is required" })}
              type="text"
              placeholder="Full name"
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.userName && (
              <p className="mt-1 text-sm text-red-500">{errors.userName.message}</p>
            )}

            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create account
            </button>
          </form>

          <footer className="my-6 text-center text-xs text-gray-500 leading-relaxed">
            <p>
              By signing up, you agree to our{" "}
              <a href="#" className="text-blue-400 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-400 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </footer>

          <small>
            Already have Account{" "}
            <NavLink className="text-[1rem] underline font-bold text-blue-500" to="/login">Login</NavLink>
          </small>

          {errorMessage && (
            <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Register;
