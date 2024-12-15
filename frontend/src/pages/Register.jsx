import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import styles from "./Register.module.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/register", { name, email, password });
      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      alert("Registration failed!");
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Register</h2>
        <form onSubmit={handleRegister} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.submitButton}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
