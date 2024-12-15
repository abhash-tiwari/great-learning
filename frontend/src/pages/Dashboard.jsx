import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      
     
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setIsLoading(true);
        
      
        const projectsResponse = await axios.get("/projects");

     
        const tasksResponse = await axios.get("/tasks");

        setProjects(projectsResponse.data);
        setTasks(tasksResponse.data);
        setError(null);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        console.error("Full error details:", {
          message: err.message,
          response: err.response,
          config: err.config
        });

        setError("Failed to load dashboard data");
        
     
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h2 className={styles.title}>Dashboard</h2>
      </header>

      <div className={styles.dashboardContent}>
        <div className={styles.projectSection}>
          <h3 className={styles.sectionTitle}>Projects</h3>
          {projects.length === 0 ? (
            <p className={styles.emptyState}>No projects found</p>
          ) : (
            <ul className={styles.projectList}>
              {projects.map((project) => (
                <li
                  key={project._id}
                  className={styles.projectItem}
                  onClick={() => navigate(`/projects/${project._id}`)}
                >
                  <span className={styles.projectTitle}>{project.title}</span>
                  <span className={styles.projectDetails}>
                    {project.tasks ? project.tasks.length : 0} tasks
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.taskSection}>
          <h3 className={styles.sectionTitle}>Recent Tasks</h3>
          {tasks.length === 0 ? (
            <p className={styles.emptyState}>No tasks found</p>
          ) : (
            <ul className={styles.taskList}>
              {tasks.map((task) => (
                <li key={task._id} className={styles.taskItem}>
                  <span className={styles.taskTitle}>{task.title}</span>
                  <span 
                    className={`${styles.taskStatus} ${styles[task.status.toLowerCase().replace(' ', '-')]}`}
                  >
                    {task.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;