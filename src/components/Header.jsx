import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import toast from 'react-hot-toast';


const Header = () => {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logout Successfully😄")
    navigate("/login"); // Redirect to login page after logout
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-gray-50 to-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
       <div className="gap-2 flex items-center justify-center">
        <img src="https://prompt-share-app-rho.vercel.app/assets/images/logo.svg" alt="" className="h-7"/>
       <h1 className="text-2xl font-bold text-gray-800">Magnet Brains</h1>
       {user && <span>Welcome, {user.name}</span>}
       </div>
       {user ? (
        <button onClick={handleLogout} className="px-4 py-2 bg-black text-white rounded-md text-sm">Logout</button>
       ):
       (
        <Link to='/login' className="px-4 py-2 bg-black text-white rounded-md text-sm">Login</Link>
       )
       }
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-black leading-snug">
          MernStack <br /> <span className="text-orange-500">Task description</span>
        </h2>
        <p className="mt-4 text-black font-semibold max-w-lg text-sm">
        Developed a full-stack task management application using the MERN stack (MongoDB, Express.js, React.js, Node.js). The project included the following features:
        </p>
        <p className="max-w-lg text-xs font-semibold my-2">1. <span className="font-bold"> Authentication System:</span> Implemented user registration, login, and logout functionality with secure JWT-based authentication.</p>
        <p className="max-w-lg text-xs font-semibold my-2">2. <span className="font-bold"> Task Management:</span> Designed CRUD operations for tasks, including features for creating, editing, deleting, and updating task status and priority.</p>
        <p className="max-w-lg text-xs font-semibold my-2">3. <span className="font-bold"> Responsive UI:</span> Built a mobile-first, user-friendly interface with React.js and styled using Tailwind CSS.</p>
        <p className="max-w-lg text-xs font-semibold my-2">4. <span className="font-bold"> Real Time Notifications:</span> Integrated toast notifications for login, logout, task creation, and task updates using react-hot-toast.</p>
        <p className="max-w-lg text-xs font-semibold my-2">5. <span className="font-bold"> Deployed:</span> Deployed the frontend to GitHub Pages and the backend to Render, ensuring seamless integration and API communication.</p>

      </main>
    </div>
  );
};

export default Header;
