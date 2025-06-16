// routes/paper.routes.js
const express = require('express');
const router  = express.Router({ mergeParams: true });
const paperController = require('../controllers/paper.controller');

// Create a new paper in a bundle (Admin only)
router.post('/', paperController.createPaper);

// Get all papers in a bundle (Student/Admin)
router.get('/', paperController.getPapersByBundle);

// Get a single paper by paperId
router.get('/:paperId', paperController.getPaperById);

// Update a paper (Admin only)
router.put('/:paperId', paperController.updatePaper);

// Delete a paper (Admin only)
router.delete('/:paperId', paperController.deletePaper);

module.exports = router;