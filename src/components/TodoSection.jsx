import { useState, useEffect } from "react";

const STATUSES = {
  remaining: "Remaining",
  paused: "Paused",
  completed: "Completed",
};

function formatDate(value) {
  return new Date(value).toLocaleString("fr-FR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function TodoSection() {
  const [text, setText] = useState("");
  const [due, setDue] = useState("");
  const [filter, setFilter] = useState("all");
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("tasks-v2");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("tasks-v2", JSON.stringify(todos));
  }, [todos]);

  function addTodo(e) {
    e.preventDefault();
    if (text.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      status: "remaining",
      createdAt: Date.now(),
      due: due, // "" ila ma 7ottach deadline
    };

    setTodos([newTodo, ...todos]); // jdida f foug
    setText("");
    setDue("");
  }

  function changeStatus(id, status) {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, status } : todo))
    );
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function clearCompleted() {
    setTodos(todos.filter((todo) => todo.status !== "completed"));
  }

  function isOverdue(todo) {
    return (
      todo.due !== "" &&
      todo.status !== "completed" &&
      new Date(todo.due) < new Date()
    );
  }

  const count = (status) =>
    todos.filter((todo) => todo.status === status).length;

  const visibleTodos = todos.filter(
    (todo) => filter === "all" || todo.status === filter
  );

  const filters = ["all", "remaining", "paused", "completed"];

  return (
    <section id="tasks" className="section tasks">
      <h2>My tasks</h2>

      {/* Stats */}
      <div className="stats">
        <div className="stat remaining">
          <strong>{count("remaining")}</strong>
          <span>Remaining</span>
        </div>
        <div className="stat paused">
          <strong>{count("paused")}</strong>
          <span>Paused</span>
        </div>
        <div className="stat completed">
          <strong>{count("completed")}</strong>
          <span>Completed</span>
        </div>
      </div>

      {/* Form */}
      <form className="task-form" onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="datetime-local"
          value={due}
          onChange={(e) => setDue(e.target.value)}
          title="Deadline (optional)"
        />
        <button type="submit" className="btn">Add</button>
      </form>

      {/* Filters */}
      <div className="filters">
        {filters.map((name) => (
          <button
            key={name}
            className={filter === name ? "filter active" : "filter"}
            onClick={() => setFilter(name)}
          >
            {name}
          </button>
        ))}
      </div>

      {/* List */}
      <ul className="task-list">
        {visibleTodos.length === 0 && (
          <li className="empty">No tasks here yet.</li>
        )}

        {visibleTodos.map((todo) => (
          <li key={todo.id} className={`task ${todo.status}`}>
            <div className="task-main">
              <span className="task-text">{todo.text}</span>

              <select
                value={todo.status}
                onChange={(e) => changeStatus(todo.id, e.target.value)}
              >
                {Object.entries(STATUSES).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>

              <button className="delete" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </div>

            <div className="task-meta">
              <span className={`badge ${todo.status}`}>
                {STATUSES[todo.status]}
              </span>
              <span>Created: {formatDate(todo.createdAt)}</span>
              {todo.due && <span>Due: {formatDate(todo.due)}</span>}
              {isOverdue(todo) && <span className="overdue">Overdue</span>}
            </div>
          </li>
        ))}
      </ul>

      {todos.some((todo) => todo.status === "completed") && (
        <button className="clear" onClick={clearCompleted}>
          Clear completed
        </button>
      )}
    </section>
  );
}

export default TodoSection;