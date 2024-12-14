const Task = require('../models/Task');
const Project = require('../models/Project');

exports.createTask = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      status, 
      project: projectId, 
      assignedTo, 
      deadline 
    } = req.body;

    // Check project exists and user is a member
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Create new task
    const newTask = new Task({
      title,
      description,
      status: status || 'To-Do',
      project: projectId,
      assignedTo,
      createdBy: req.user.id,
      deadline
    });

    const task = await newTask.save();

    // Add task to project
    project.tasks.push(task._id);
    await project.save();

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Find tasks for specific project
    const tasks = await Task.find({ project: projectId })
      .populate('assignedTo', ['name', 'email'])
      .populate('createdBy', ['name', 'email']);

    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      status, 
      assignedTo, 
      deadline 
    } = req.body;

    // Find task
    let task = await Task.findById(req.params.id);

    // Check task exists
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Update task
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { 
        $set: { 
          title, 
          description, 
          status, 
          assignedTo, 
          deadline 
        } 
      },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check task exists
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Remove task
    await task.remove();

    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};