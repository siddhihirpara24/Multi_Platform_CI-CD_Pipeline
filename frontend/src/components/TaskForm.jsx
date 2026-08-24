import { useState } from "react";
import "./TaskForm.css";

function TaskForm({
  onAddTask,
  onUpdateTask,
  editingTask,
  onCancelEdit,
}) {
  const [title, setTitle] = useState(
    editingTask?.title || ""
  );

  const [description, setDescription] = useState(
    editingTask?.description || ""
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check title
    if (!title.trim()) {
      alert("Please enter a task title.");
      return;
    }

    const task = {
      title: title.trim(),
      description: description.trim(),
      completed: editingTask
        ? editingTask.completed
        : false,
    };

    try {
      if (editingTask) {
        await onUpdateTask({
          ...task,
          id: editingTask.id,
        });
      } else {
        await onAddTask(task);

        // Clear form after adding
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.error("Task operation failed:", error);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    onCancelEdit();
  };

  return (
    <div className="task-form-card">
      <h2>
        {editingTask ? "Edit Task" : "Add New Task"}
      </h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Task Title
        </label>

        <input
          id="title"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
        />

        <label htmlFor="description">
          Description
        </label>

        <textarea
          id="description"
          rows="5"
          placeholder="Enter task description"
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
        />

        <button
          type="submit"
          className="primary-button"
        >
          {editingTask ? "Update Task" : "Add Task"}
        </button>

        {editingTask && (
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default TaskForm;