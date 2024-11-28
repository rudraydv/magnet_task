import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TaskDetails from "./pages/TaskDetails";
import {Toaster} from 'react-hot-toast';
import Header from './components/Header';
import TaskEdit from './pages/TaskEdit';
import ProtectedRoute from './components/ProtectedRoute';


function App() {

  return (
    <>
    <AuthProvider>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path='/login' element  = {<Login/>}/>
            <Route path="/register" element={<Register />} />
            <Route path="/tasks/:id" element={<TaskDetails />} />
            <Route path='/taskedit/:id' element={<TaskEdit />} />

            {/* Protected Route for Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
          </Routes>
          <Toaster/> 
        </Router>
      </TaskProvider>
    </AuthProvider>

    </>
  )
}

export default App;
