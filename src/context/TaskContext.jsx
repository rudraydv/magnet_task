import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { token } = useContext(AuthContext);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error.message);
    }
  };

  const createTask = async (taskData) => {
    try {
      const response = await axios.post("http://localhost:4000/api/tasks", taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error("Failed to create task:", error.message);
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/tasks/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? response.data : task))
      );
    } catch (error) {
      console.error("Failed to update task:", error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error.message);
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, fetchTasks, createTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
