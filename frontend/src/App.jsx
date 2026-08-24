import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const API_URL = "http://localhost:8080/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadTasks = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();

        if (!cancelled) {
          setTasks(data);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError("Unable to connect to the backend.");
          console.error(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadTasks();

    return () => {
      cancelled = true;
    };
  }, []);

  const addTask = async (task) => {
    try {
      setError("");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const newTask = await response.json();

      setTasks((previousTasks) => [
        ...previousTasks,
        newTask,
      ]);
    } catch (err) {
      setError("Unable to add task.");
      console.error(err);
    }
  };

  const updateTask = async (task) => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();

      setTasks((previousTasks) =>
        previousTasks.map((item) =>
          item.id === updatedTask.id
            ? updatedTask
            : item
        )
      );

      setEditingTask(null);
    } catch (err) {
      setError("Unable to update task.");
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((previousTasks) =>
        previousTasks.filter((task) => task.id !== id)
      );
    } catch (err) {
      setError("Unable to delete task.");
      console.error(err);
    }
  };

  const toggleTask = async (task) => {
    await updateTask({
      ...task,
      completed: !task.completed,
    });
  };

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingCount = tasks.length - completedCount;

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>TaskFlow</h1>
          <p>Simple Task Management Application</p>
        </div>
      </header>

      <main className="container">
        <section className="stats">
          <div className="stat-card">
            <span>Total Tasks</span>
            <strong>{tasks.length}</strong>
          </div>

          <div className="stat-card">
            <span>Pending</span>
            <strong>{pendingCount}</strong>
          </div>

          <div className="stat-card">
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </div>
        </section>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <section className="content">
          <TaskForm
            key={editingTask ? editingTask.id : "new-task"}
            onAddTask={addTask}
            onUpdateTask={updateTask}
            editingTask={editingTask}
            onCancelEdit={() => setEditingTask(null)}
          />

          <TaskList
            tasks={tasks}
            loading={loading}
            onEdit={setEditingTask}
            onDelete={deleteTask}
            onToggle={toggleTask}
          />
        </section>
      </main>
    </div>
  );
}

export default App;