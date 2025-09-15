import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../store/actions/userAction";
import { context } from "../wrapper";
import axios from "../utils/axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
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
      <div className="flex items-center justify-center bg-gray-100 h-screen p-5">
          <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
            <h2 className="text-3xl font-bold text-center">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  {...register("userName", { required: "Username is required" })}
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
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
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
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
                Register
              </button>
            </form>

            <small>Already have Account <NavLink to="/login" className="text-sm underline font-bold text-blue-500">Login</NavLink> </small>
            <p className="text-xl text-red-600">{errorMessage}</p>
          </div>
      </div>
  );
};

export default Register;
