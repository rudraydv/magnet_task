import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import BASE_URL from '../config';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTask(response.data);
      } catch (error) {
        console.error("Failed to fetch task details:", error.message);
      }
    };
    fetchTask();
  }, [id, token]);

  if (!task) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-2">{task.title}</h1>
      <p>{task.description}</p>
      <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
    </div>
  );
};

export default TaskDetails;
