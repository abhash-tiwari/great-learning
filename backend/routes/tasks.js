// backend/routes/tasks.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');

// @route   POST /api/tasks
// @desc    Create a task
router.post(
  '/', 
  [
    authMiddleware,
    check('title', 'Title is required').not().isEmpty(),
    check('project', 'Project is required').not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    taskController.createTask(req, res);
  }
);

// @route   GET /api/tasks/:projectId
// @desc    Get tasks for a project
router.get('/:projectId', authMiddleware, taskController.getTasks);

// @route   PUT /api/tasks/:id
// @desc    Update a task
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
    taskController.updateTask(req, res);
  }
);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;