import "./TaskItem.css";

function TaskItem({
  task,
  onEdit,
  onDelete,
  onToggle,
}) {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        <div className="task-title-row">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task)}
          />

          <h3>{task.title}</h3>
        </div>

        {task.description && (
          <p>{task.description}</p>
        )}

        <span
          className={`status ${
            task.completed ? "status-completed" : "status-pending"
          }`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="task-actions">
        <button
          className="edit-button"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;