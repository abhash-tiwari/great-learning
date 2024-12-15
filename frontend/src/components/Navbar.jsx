import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const handleLoginRegister = () => {
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <h1>Task Manager</h1>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        {isLoggedIn ? (
          <>
            <li>Welcome</li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <li><button onClick={handleLoginRegister}>Login/Register</button></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
