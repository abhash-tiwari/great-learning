const Task = require("../models/Task");
const mongoose = require('mongoose');

// Create a new task
const createTask = async (req, res) => {
  const { title, description, status, deadline, assignedUser, projectId, priority } = req.body;
  
  try {
    // Validate input
    if (!title || !description || !deadline || !projectId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const task = new Task({
      title,
      description,
      status: status || "To-Do",
      deadline,
      user: req.user._id, // Current logged-in user creating the task
      assignedUser,
      project: projectId,
      priority: priority || "Medium"
    });

    const newTask = await task.save();

    // Populate the task with assigned user and project details
    const populatedTask = await Task.findById(newTask._id)
      .populate('assignedUser', 'name email')
      .populate('project', 'name description');

    res.status(201).json(populatedTask);
  } catch (error) {
    console.error("Create Task Error:", error);
    res.status(400).json({ 
      message: "Error creating task", 
      error: error.message 
    });
  }
};

// Get all tasks for a user
const getTasks = async (req, res) => {
  const { projectId, status, priority } = req.query;
  
  try {
    // Build query object
    const query = { user: req.user._id };
    
    // Optional filters
    if (projectId) query.project = projectId;
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const tasks = await Task.find(query)
      .populate('assignedUser', 'name email')
      .populate('project', 'name description')
      .sort({ createdAt: -1 }); // Sort by most recent first

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Get Tasks Error:", error);
    res.status(400).json({ 
      message: "Error fetching tasks", 
      error: error.message 
    });
  }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await Task.findById(id)
      .populate('assignedUser', 'name email')
      .populate('project', 'name description')
      .populate('user', 'name email');

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the current user has access to this task
    if (task.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to view this task" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Get Task by ID Error:", error);
    res.status(400).json({ 
      message: "Error fetching task", 
      error: error.message 
    });
  }
};

// Update an existing task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, deadline, assignedUser, projectId, priority } = req.body;

  try {
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the user is authorized to update this task
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to update this task" });
    }

    // Update task fields
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.deadline = deadline || task.deadline;
    task.assignedUser = assignedUser || task.assignedUser;
    task.project = projectId || task.project;
    task.priority = priority || task.priority;

    const updatedTask = await task.save();

    // Populate the updated task
    const populatedTask = await Task.findById(updatedTask._id)
      .populate('assignedUser', 'name email')
      .populate('project', 'name description');

    res.status(200).json(populatedTask);
  } catch (error) {
    console.error("Update Task Error:", error);
    res.status(400).json({ 
      message: "Error updating task", 
      error: error.message 
    });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the user is authorized to delete this task
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this task" });
    }

    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task successfully removed" });
  } catch (error) {
    console.error("Delete Task Error:", error);
    res.status(400).json({ 
      message: "Error deleting task", 
      error: error.message 
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
}