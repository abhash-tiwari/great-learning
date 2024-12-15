import React from "react";
import styles from "./ProjectCard.module.css";

const ProjectCard = ({ project, onClick }) => {
  return (
    <div className={styles.projectCard} onClick={onClick}>
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.description}>{project.description}</p>
      <small className={styles.creationDate}>
        Created on: {new Date(project.creationDate).toLocaleDateString()}
      </small>
    </div>
  );
};

export default ProjectCard;