// backend/routes/projects.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/auth');

// @route   POST /api/projects
// @desc    Create a project
router.post(
  '/', 
  [
    authMiddleware,
    check('title', 'Title is required').not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    projectController.createProject(req, res);
  }
);

// @route   GET /api/projects
// @desc    Get all projects for user
router.get('/', authMiddleware, projectController.getAllProjects);

// @route   PUT /api/projects/:id
// @desc    Update a project
router.put(
  '/:id', 
  [
    authMiddleware,
    check('title', 'Title is required').not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    projectController.updateProject(req, res);
  }
);

// @route   DELETE /api/projects/:id
// @desc    Delete a project
router.delete('/:id', authMiddleware, projectController.deleteProject);

module.exports = router;