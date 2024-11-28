import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="p-4 bg-gray-200 flex justify-between">
      <div>
        <Link to="/dashboard" className="mr-4">
          Dashboard
        </Link>
        {user && <span>Welcome, {user.name}</span>}
      </div>
      <div>
        {user ? (
          <button onClick={logout} className="text-red-500">
            Logout
          </button>
        ) : (
          <>
            <div className="bg-blue-500 text-white font-semibold hover:bg-blue-700 px-4 py-2 rounded">
            <Link to="/">Login</Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
