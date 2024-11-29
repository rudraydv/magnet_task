const Task = require("../models/taskModel");
createTask = async (req, res) => {
    
  const { title, description, dueDate, priority, assignedTo } = req.body;
  try {
    const task = new Task({ title, description, dueDate, priority, assignedTo });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Create a new task
 */createTask = async (req, res) => {
  const { title, description, dueDate, priority, assignedTo } = req.body;

  try {
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      assignedTo: assignedTo || req.user, // Assign task to logged-in user if not specified
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get all tasks (with pagination and filters)
 */getTasks = async (req, res) => {
  const { page = 1, limit = 10, priority, status } = req.query;

  try {
    const query = {
      ...(priority && { priority }), 
      ...(status && { status }), 
    };

    const tasks = await Task.find(query)
      .populate("assignedTo", "username") 
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ dueDate: 1 }); 

    const total = await Task.countDocuments(query);

    res.status(200).json({
      tasks,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get a specific task by ID
 */getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("assignedTo", "username");
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update a task
 */updateTask = async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;

  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Update task details
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;

    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Delete a task
 */deleteTask = async (req, res) => {
  try {
    const { id } = req.params; // Get task ID from request parameters

    // Find and delete the task
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Update task status
 */updateTaskStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = status;
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Move task to another priority list
 */moveTaskPriority = async (req, res) => {
  const { priority } = req.body;

  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.priority = priority;
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get tasks assigned to the logged-in user
 */getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user })
      .populate("assignedTo", "username")
      .sort({ dueDate: 1 });

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getUserTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
  moveTaskPriority,
  deleteTask,
};

