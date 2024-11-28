import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from '../config';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation function
  const validate = () => {
    let isValid = true;
    let errorMessages = {};

    // Name validation
    if (!formData.name) {
      errorMessages.name = "Name is required.";
      isValid = false;
    }

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
    } else if (formData.password.length < 8) {
      errorMessages.password = "Password must be at least 8 characters.";
      isValid = false;
    } else if (!/[A-Z]/.test(formData.password)) {
      errorMessages.password = "Password must contain at least one uppercase letter.";
      isValid = false;
    } else if (!/[0-9]/.test(formData.password)) {
      errorMessages.password = "Password must contain at least one number.";
      isValid = false;
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      errorMessages.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(errorMessages);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // Prevent form submission if validation fails

    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.status === 400) {
        // Handle backend validation errors
        alert(data.message || "User registration failed.");
      } else {
        // Registration successful
        alert(data.message || "User registered successfully!");
        navigate("/dashboard"); // Redirect to login page after successful registration
      }
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto mt-8 bg-white rounded shadow-md border border-gray-400">
      <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border-b-[1px] border-black focus:outline-none"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border-b-[1px] border-black focus:outline-none"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border-b-[1px] border-black focus:outline-none"
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border-b-[1px] border-black focus:outline-none"
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 hover:bg-blue-700 text-white rounded duration-500"
        >
          Register
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm">
          I have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
