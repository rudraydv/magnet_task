import React, { useEffect, useState, useContext } from "react";
import TaskContext from "../context/TaskContext";
import toast from 'react-hot-toast';

const TaskList = () => {
  const { tasks, fetchTasks, deleteTask, updateTask } = useContext(TaskContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    _id: "",
    title: "",
    description: "",
    dueDate: "",
    priority: "low",
    status: "not started",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  // Open modal and prefill task data
  const openModal = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask({
      _id: "",
      title: "",
      description: "",
      dueDate: "",
      priority: "low",
      status: "not started",
    });
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  // Handle task update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateTask(currentTask._id, currentTask); // Call the context's update function
      toast.success("Task updated successfully!😄");
      closeModal(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Task List</h1>
      {tasks.map((task) => (
        <div key={task._id} className="p-4 border-b">
          <h2 className="text-xl">{task.title}</h2>
          <p>{task.description}</p>
          <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          <p>Priority: {task.priority}</p>
          <p>Status: {task.status}</p>
          <button
         onClick={() => {
         deleteTask(task._id);
         toast.success("Task deleted successfully!");
          }}
         className="text-red-500 mr-4"
          >
           Delete
         </button>
          <button
            onClick={() => openModal(task)}
            className="text-blue-600"
          >
            Edit
          </button>
        </div>
      ))}

      {/* Modal for Editing Task */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded sm:w-1/3 w-80">
            <h2 className="text-xl mb-1">Edit And Update Task</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-1">
                <label className="block mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={currentTask.title}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Description</label>
                <textarea
                  name="description"
                  value={currentTask.description}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={currentTask.dueDate}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Priority</label>
                <select
                  name="priority"
                  value={currentTask.priority}
                  onChange={handleChange}
                  className="w-full p-2 border"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block mb-1">Status</label>
                <select
                  name="status"
                  value={currentTask.status}
                  onChange={handleChange}
                  className="w-full p-2 border"
                >
                  <option value="not started">Not Started</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-500 text-white mr-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
