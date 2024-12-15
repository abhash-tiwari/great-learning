import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Welcome Back</h2>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.forgotPassword}>
            <a href="/forgot-password" className={styles.forgotPasswordLink}>
              Forgot Password?
            </a>
          </div>
          <button type="submit" className={styles.submitButton}>
            Log In
          </button>
        </form>
        <div className={styles.signupLink}>
          Don't have an account? 
          <a href="/register" className={styles.signupLinkText}>Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;