// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authenticate = require('../middlewares/auth.middleware');

// Public endpoints
router.post('/register-student', authController.registerStudent);
router.post('/register-admin', authController.registerAdmin);

// Protected endpoints
router.get('/profile', authenticate, authController.getProfile);
router.put('/profile', authenticate, authController.updateProfile);

module.exports = router;

//auth.routes.js