import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/common/Header";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Project } from "./components/project/Project";
import "./styles/global.css";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let storedProjects = [];

    try {
      storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    } catch (error) {
      console.error("Error parsing projects from localStorage:", error);
    }

    if (storedProjects.length === 0) {
      const defaultProjects = [
        {
          id: "1",
          title: "Project 1",
          description: "Description 1",
          coverImage: "default1.jpg",
        },
        {
          id: "2",
          title: "Project 2",
          description: "Description 2",
          coverImage: "default2.jpg",
        },
        {
          id: "3",
          title: "Project 3",
          description: "Description 3",
          coverImage: "default3.jpg",
        },
        {
          id: "4",
          title: "Project 4",
          description: "Description 4",
          coverImage: "default4.jpg",
        },
        {
          id: "5",
          title: "Project 5",
          description: "Description 5",
          coverImage: "default5.jpg",
        },
        {
          id: "6",
          title: "Project 6",
          description: "Description 6",
          coverImage: "default6.jpg",
        },
        {
          id: "7",
          title: "Project 7",
          description: "Description 7",
          coverImage: "default7.jpg",
        },
        {
          id: "8",
          title: "Project 8",
          description: "Description 8",
          coverImage: "default8.jpg",
        },
        {
          id: "9",
          title: "Project 9",
          description: "Description 9",
          coverImage: "default9.jpg",
        },
        {
          id: "10",
          title: "Project 10",
          description: "Description 10",
          coverImage: "default10.jpg",
        },
      ];
      localStorage.setItem("projects", JSON.stringify(defaultProjects));
      storedProjects = defaultProjects;
    }

    setProjects(storedProjects);
  }, []);

  return (
    <div className="app">
      {user && <Header />}
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard projects={projects} />
              </PrivateRoute>
            }
          />
          <Route
            path="/project/:id"
            element={
              <PrivateRoute>
                <Project projects={projects} />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
