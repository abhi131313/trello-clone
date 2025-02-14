import React from "react";
import { useNavigate } from "react-router-dom";

export const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div
      className="project-card"
      onClick={() => navigate(`/project/${project.id}`)}
    >
      <img
        src={project.coverImage}
        alt={project.title}
        className="project-cover"
      />
      <div className="project-info">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </div>
  );
};
