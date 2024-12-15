const Project = require('../models/Project');

// Create a new project
const createProject = async (req, res) => {
  const { title, description } = req.body;

  try {
    const project = new Project({
      title,
      description,
      owner: req.user._id, // Associate project with the logged-in user
    });

    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: 'Error creating project', error: error.message });
  }
};

// Get all projects for a user
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id });
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching projects', error: error.message });
  }
};

// Update an existing project
const updateProject = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if the user is authorized to update this project
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    project.title = title || project.title;
    project.description = description || project.description;

    const updatedProject = await project.save();
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: 'Error updating project', error: error.message });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if the user is authorized to delete this project
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await project.remove();
    res.status(200).json({ message: 'Project removed' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting project', error: error.message });
  }
};

module.exports = { createProject, getProjects, updateProject, deleteProject };
