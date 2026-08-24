import TaskItem from "./TaskItem";
import "./TaskList.css";

function TaskList({
  tasks,
  loading,
  onEdit,
  onDelete,
  onToggle,
}) {
  return (
    <div className="task-list-card">
      <div className="task-list-header">
        <h2>Your Tasks</h2>
        <span>{tasks.length} tasks</span>
      </div>

      {loading ? (
        <div className="empty-message">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="empty-message">
          No tasks available. Add your first task!
        </div>
      ) : (
        <div className="tasks">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;