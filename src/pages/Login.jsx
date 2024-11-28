import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation function for the login form
  const validate = () => {
    let isValid = true;
    let errorMessages = {};

    // Email validation
    if (!formData.email) {
      errorMessages.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errorMessages.email = "Email is invalid.";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      errorMessages.password = "Password is required.";
      isValid = false;
    }

    setErrors(errorMessages);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // Prevent form submission if validation fails

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.status === 400) {
        // Handle incorrect login credentials
        toast.error(data.message || "Login failed.");
      } else if (response.status === 200) {
        // On successful login
        localStorage.setItem("token", data.token); // Store token in localStorage
        toast.success(data.message || "Login successful!");
        navigate("/dashboard"); // Redirect to the dashboard page
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto mt-20 bg-white border rounded border-gray-400 shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border-b-[1px] border-black focus:outline-none"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border-b-[1px] border-black focus:outline-none"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 hover:bg-blue-700 text-white rounded"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
