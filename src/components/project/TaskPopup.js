import React, { useEffect, useCallback, useRef } from "react";
import "../../styles/taskPopup.css";

const TaskPopup = ({ task, onClose }) => {
  const popupRef = useRef(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target.className === "popup-overlay") {
        onClose();
      }
    },
    [onClose]
  );

  const formatDate = useCallback((dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  useEffect(() => {
    const originalStyle = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
    };

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.paddingRight = originalStyle.paddingRight;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!task) return null;

  return (
    <div
      className="popup-overlay"
      onMouseDown={handleOverlayClick}
      onMouseUp={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        ref={popupRef}
        className="popup-content"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
      >
        <button
          className="close-btn"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close popup"
        >
          ×
        </button>
        <div className="popup-header">
          <h2>{task.title}</h2>
        </div>
        <div className="popup-body">
          <div className="task-field">
            <strong>Description</strong>
            <p>{task.description || "No description provided"}</p>
          </div>
          <div className="task-field">
            <strong>Status</strong>
            <p>{task.status || "Not set"}</p>
          </div>
          <div className="task-field">
            <strong>Assigned To</strong>
            <p>{task.assignedUser || "Unassigned"}</p>
          </div>
          <div className="task-field">
            <strong>Due Date</strong>
            <p>{formatDate(task.dueDate) || "No due date"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPopup;
