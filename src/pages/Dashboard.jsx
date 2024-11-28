import React from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
  return (
    <div className="p-4">
     <div className="flex items-center justify-between py-4">
     <h1 className="text-2xl mb-4">Task Dashboard</h1>
      <a href="/" className="bg-black px-4 py-2 rounded text-white font-semibold">Home</a>
     </div>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default Dashboard;
