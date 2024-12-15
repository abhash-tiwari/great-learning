import React from "react";
import styles from "./TaskCard.module.css";

const TaskCard = ({ task }) => {
  const getStatusClass = () => {
    switch (task.status) {
      case "To-Do":
        return styles.todoStatus;
      case "In Progress":
        return styles.inProgressStatus;
      case "Completed":
        return styles.completedStatus;
      default:
        return styles.defaultStatus;
    }
  };

  return (
    <div className={styles.taskCard}>
      <div className={styles.taskHeader}>
        <h4 className={styles.taskTitle}>{task.title}</h4>
        <span className={`${styles.taskStatus} ${getStatusClass()}`}>
          {task.status}
        </span>
      </div>
      <p className={styles.taskDescription}>{task.description}</p>
      <div className={styles.taskFooter}>
        <div className={styles.taskDetails}>
          <small className={styles.taskDeadline}>
            Deadline: {new Date(task.deadline).toLocaleDateString()}
          </small>
          <small className={styles.taskAssignee}>
            Assigned to: {task.assignedUser?.name || "Unassigned"}
          </small>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;