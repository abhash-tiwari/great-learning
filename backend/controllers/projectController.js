const Project = require('../models/Project');
const User = require('../models/User');

exports.createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Create new project
    const newProject = new Project({
      title,
      description,
      owner: req.user.id,
      members: [req.user.id]
    });

    const project = await newProject.save();

    // Add project to user's projects
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { projects: project._id } },
      { new: true }
    );

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ 
      $or: [
        { owner: req.user.id },
        { members: req.user.id }
      ]
    }).populate('owner', ['name', 'email']);

    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    // Find project
    let project = await Project.findById(req.params.id);

    // Check project exists
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Check user is owner
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Update project
    project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description } },
      { new: true }
    );

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    // Check project exists
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Check user is owner
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Remove project
    await project.remove();

    res.json({ msg: 'Project removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};