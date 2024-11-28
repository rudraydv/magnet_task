import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BASE_URL from '../config';

const TaskEdit = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    status: "",
  });
  const { id } = useParams(); // Get the task ID from the URL params
  const navigate = useNavigate();

  // Fetch the task data when the component mounts
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/tasks/${id}`);
        const data = await response.json();
        if (data.task) {
          setTask(data.task); // Set task data in state
        } else {
          alert("Task not found");
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      if (data.task) {
        alert("Task updated successfully!");
        navigate("/tasks"); // Navigate back to task list or dashboard
      } else {
        alert("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Error updating task");
    }
  };

  return (
    <div>
      <h1>Edit Task</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Task Title"
          required
        />
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Task Description"
          required
        />
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          required
        />
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          required
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          required
        >
          <option value="not started">Not Started</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default TaskEdit;
