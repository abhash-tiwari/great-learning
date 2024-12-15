import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import axios from "../services/api";
import styles from "./ProjectDetails.module.css";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const projectResponse = await axios.get(`/projects/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProject(projectResponse.data.project);
        setTasks(projectResponse.data.tasks);
      } catch (err) {
        alert("Failed to fetch project details.");
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const groupTasksByStatus = (status) =>
    tasks.filter((task) => task.status === status);

  return (
    <div className={styles.projectDetailsPage}>
      <div className={styles.projectDetailsContainer}>
        <header className={styles.projectHeader}>
          <h2 className={styles.projectTitle}>{project.title}</h2>
          <p className={styles.projectDescription}>{project.description}</p>
        </header>

        <div className={styles.taskBoard}>
          <div className={styles.taskColumn}>
            <h4 className={styles.columnTitle}>To-Do</h4>
            <div className={styles.taskList}>
              {groupTasksByStatus("To-Do").map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
          <div className={styles.taskColumn}>
            <h4 className={styles.columnTitle}>In Progress</h4>
            <div className={styles.taskList}>
              {groupTasksByStatus("In Progress").map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
          <div className={styles.taskColumn}>
            <h4 className={styles.columnTitle}>Completed</h4>
            <div className={styles.taskList}>
              {groupTasksByStatus("Completed").map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;