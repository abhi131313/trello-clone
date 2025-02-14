import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { TaskCard } from "./TaskCard";
import "../../styles/project.css";

export const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [lists, setLists] = useState({
    backlog: { title: "Backlog", items: [] },
    ready: { title: "Ready", items: [] },
    inProgress: { title: "In Progress", items: [] },
    done: { title: "Done", items: [] },
  });

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");

    const currentProject = projects.find((p) => String(p.id) === String(id));

    if (!currentProject) {
      console.error(`Project with id ${id} not found`);
      return;
    }

    if (!Array.isArray(currentProject.tasks)) {
      currentProject.tasks = [];
    }

    if (currentProject.tasks.length === 0) {
      currentProject.tasks = [
        {
          id: "1",
          title: "Define Scope",
          description: "Set project goals",
          status: "backlog",
        },
        {
          id: "2",
          title: "Research",
          description: "Gather necessary information",
          status: "backlog",
        },
        {
          id: "3",
          title: "Design UI",
          description: "Create initial wireframes",
          status: "ready",
        },
        {
          id: "4",
          title: "Plan Development",
          description: "Break tasks into sprints",
          status: "ready",
        },
        {
          id: "5",
          title: "Develop Features",
          description: "Write core functionalities",
          status: "inProgress",
        },
        {
          id: "6",
          title: "Fix Bugs",
          description: "Test and resolve issues",
          status: "inProgress",
        },
        {
          id: "7",
          title: "Deploy Project",
          description: "Release final version",
          status: "done",
        },
        {
          id: "8",
          title: "Review & Improve",
          description: "Get feedback and refine",
          status: "done",
        },
      ];
    }

    setProject(currentProject);

    const categorizedLists = {
      backlog: {
        title: "Backlog",
        items: currentProject.tasks.filter((task) => task.status === "backlog"),
      },
      ready: {
        title: "Ready",
        items: currentProject.tasks.filter((task) => task.status === "ready"),
      },
      inProgress: {
        title: "In Progress",
        items: currentProject.tasks.filter(
          (task) => task.status === "inProgress"
        ),
      },
      done: {
        title: "Done",
        items: currentProject.tasks.filter((task) => task.status === "done"),
      },
    };

    setLists(categorizedLists);
  }, [id]);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newLists = JSON.parse(JSON.stringify(lists));

    const [movedTask] = newLists[source.droppableId].items.splice(
      source.index,
      1
    );

    movedTask.status = destination.droppableId;

    newLists[destination.droppableId].items.splice(
      destination.index,
      0,
      movedTask
    );

    setLists(newLists);
    updateLocalStorage(newLists);
  };

  const updateLocalStorage = (updatedLists) => {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const updatedProjects = projects.map((p) =>
      String(p.id) === String(id)
        ? {
            ...p,
            tasks: [
              ...updatedLists.backlog.items,
              ...updatedLists.ready.items,
              ...updatedLists.inProgress.items,
              ...updatedLists.done.items,
            ],
          }
        : p
    );
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  if (!project) return <div className="loading-message">Loading...</div>;

  return (
    <div className="project-container">
      <h1 className="project-title">{project.title}</h1>
      <p className="project-description">{project.description}</p>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="lists-container">
          {Object.entries(lists).map(([listId, list]) => (
            <div key={listId} className="list">
              <h2 className="list-title">{list.title}</h2>
              <Droppable droppableId={listId}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`list-content ${
                      snapshot.isDraggingOver ? "dragging-over" : ""
                    }`}
                  >
                    {list.items.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`task-card ${
                              snapshot.isDragging ? "dragging" : ""
                            }`}
                          >
                            <TaskCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};
