// routes/bundle.routes.js
const express = require('express');
const router  = express.Router();
const bundleController = require('../controllers/bundle.controller');

// Create a new bundle (Admin only)
router.post('/', bundleController.createBundle);

// Update an existing bundle (Admin only)
router.put('/:bundleId', bundleController.updateBundle);

// Delete a bundle (Admin only)
router.delete('/:bundleId', bundleController.deleteBundle);

// Public: get all bundles
router.get('/', bundleController.getAllBundles);

// Public: get one bundle by bundleId
router.get('/:bundleId', bundleController.getBundleById);

module.exports = router;

