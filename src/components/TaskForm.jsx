import React, { useState, useContext } from "react";
import TaskContext from "../context/TaskContext";
import  toast from "react-hot-toast";

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });
  const { createTask } = useContext(TaskContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(formData);
    toast.success("Task Created Successfully😄")
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100">
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={formData.title}
        onChange={handleChange}
        required
        className="block w-full mb-2 p-2 border border-gray-300"
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={formData.description}
        onChange={handleChange}
        className="block w-full mb-2 p-2 border border-gray-300"
      />
      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        required
        className="block w-full mb-2 p-2 border border-gray-300"
      />
      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="block w-full mb-2 p-2 border border-gray-300"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white">
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
