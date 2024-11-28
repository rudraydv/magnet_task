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
      <main className="flex flex-col items-center justify-center text-center px-6 mt-14">
        <h2 className="text-4xl md:text-5xl lg:text-8xl font-extrabold text-black leading-snug">
          Magnet Brains <br /> <span className="text-orange-500">Test Assessment</span>
        </h2>
        <p className="mt-4 text-gray-600 max-w-lg text-sm lg:text-lg">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea recusandae dicta doloribus, corrupti necessitatibus dolore commodi ex ipsa eveniet,
        </p>
      
      </main>
    </div>
  );
};

export default Header;
