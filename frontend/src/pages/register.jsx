import { useContext, useState } from "react";
import styles from "./Register.module.css";
import { context } from "../wrapper";
import { useNavigate } from "react-router-dom";
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
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <svg
              className={styles.logoIcon}
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
          <span className={styles.logoText}>Connect</span>
        </div>

        <button className={styles.btnPrimary}>Sign In</button>
      </header>

      {/* Main */}
      <main className={styles.main}>
        <section className={styles.card}>
          <header className={styles.cardHeader}>
            <h1>Create your account</h1>
            <p>Join the conversation and connect with others.</p>
          </header>

          <form onSubmit={handleSubmit(onsubmit)} className={styles.form}>
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
              className={styles.inputField}
            />
            {errors.email && (
              <p className={styles.error}>
                {errors.email.message}
              </p>
            )}
            <input
              {...register("userName", { required: "Username is required" })}
              type="text"
              placeholder="Full name"
              className={styles.inputField}
            />
            {errors.userName && (
              <p className={styles.error}>
                {errors.userName.message}
              </p>
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
              placeholder="password"
              className={styles.inputField}
            />
            {errors.password && (
              <p className={styles.error}>
                {errors.password.message}
              </p>
            )}
            <button type="submit" className={`w-full ${styles.btnPrimary}`}>
              Create account
            </button>
          </form>

          <footer className={styles.footer}>
            <p>
              By signing up, you agree to our <a href="#">Terms of Service</a>{" "}
              and <a href="#">Privacy Policy</a>.
            </p>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default Register;
