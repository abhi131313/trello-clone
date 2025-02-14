import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/dashboard.css";
import projectCover from "../../assets/images/trello.jpg";

export const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    let existingProjects = JSON.parse(localStorage.getItem("projects") || "[]");

    if (existingProjects.length === 0) {
      const sampleProjects = [
        {
          id: "1",
          title: "Website Redesign",
          description: "Modernizing the company website",
          coverImage: projectCover,
        },
        {
          id: "2",
          title: "Mobile App Development",
          description: "Building a new mobile experience",
          coverImage: projectCover,
        },
      ];

      localStorage.setItem("projects", JSON.stringify(sampleProjects));
      existingProjects = sampleProjects;
    }

    setProjects(existingProjects);
  }, []);

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const nextPage = () => {
    if (currentPage < Math.ceil(projects.length / projectsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>My Projects</h1>
      <div className="projects-grid">
        {currentProjects.map((project) => (
          <Link
            to={`/project/${project.id}`}
            key={project.id}
            className="project-card"
          >
            <div className="project-cover">
              <img
                src={projectCover}
                alt={project.title}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://via.placeholder.com/800x400/e2e8f0/475569?text=${encodeURIComponent(
                    project.title
                  )}`;
                }}
              />
            </div>
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          {" "}
          Page {currentPage} of {Math.ceil(projects.length / projectsPerPage)}{" "}
        </span>
        <button
          onClick={nextPage}
          disabled={
            currentPage === Math.ceil(projects.length / projectsPerPage)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};
