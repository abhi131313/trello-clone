import React, { useState } from "react";
import "../../styles/taskCard.css";
import TaskPopup from "./TaskPopup";

export const TaskCard = ({ task }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className="task-content" onClick={() => setShowPopup(true)}>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>

      {showPopup && (
        <TaskPopup task={task} onClose={() => setShowPopup(false)} />
      )}
    </>
  );
};
