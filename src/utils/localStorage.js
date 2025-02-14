const storagePrefix = "trello_clone_";

export const storage = {
  getToken: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}token`));
  },
  setToken: (token) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },

  getUser: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}user`));
  },
  setUser: (user) => {
    window.localStorage.setItem(`${storagePrefix}user`, JSON.stringify(user));
  },
  clearUser: () => {
    window.localStorage.removeItem(`${storagePrefix}user`);
  },

  getProjects: () => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}projects`) || "[]"
    );
  },
  setProjects: (projects) => {
    window.localStorage.setItem(
      `${storagePrefix}projects`,
      JSON.stringify(projects)
    );
  },

  getUsers: () => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}users`) || "[]"
    );
  },
  setUsers: (users) => {
    window.localStorage.setItem(`${storagePrefix}users`, JSON.stringify(users));
  },

  clearAll: () => {
    Object.keys(window.localStorage).forEach((key) => {
      if (key.startsWith(storagePrefix)) {
        window.localStorage.removeItem(key);
      }
    });
  },
};

export const addProject = (project) => {
  const projects = storage.getProjects();
  projects.push(project);
  storage.setProjects(projects);
  return project;
};

export const updateProject = (updatedProject) => {
  const projects = storage.getProjects();
  const index = projects.findIndex((p) => p.id === updatedProject.id);
  if (index !== -1) {
    projects[index] = updatedProject;
    storage.setProjects(projects);
    return updatedProject;
  }
  return null;
};

export const deleteProject = (projectId) => {
  const projects = storage.getProjects();
  const filteredProjects = projects.filter((p) => p.id !== projectId);
  storage.setProjects(filteredProjects);
};

export const addUser = (user) => {
  const users = storage.getUsers();
  users.push(user);
  storage.setUsers(users);
  return user;
};

export const findUserByEmail = (email) => {
  const users = storage.getUsers();
  return users.find((u) => u.email === email);
};

export default storage;
