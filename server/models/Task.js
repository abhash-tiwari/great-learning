const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true,
      trim: true
    },
    description: { 
      type: String, 
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ["To-Do", "In Progress", "Completed"],
      default: "To-Do",
    },
    deadline: { 
      type: Date, 
      required: true 
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    assignedUser: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    }
  },
  { 
    timestamps: true 
  }
);

// Optional: Add an index to improve query performance
taskSchema.index({ user: 1, project: 1, status: 1 });

module.exports = mongoose.model("Task", taskSchema);