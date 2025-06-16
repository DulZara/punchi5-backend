// controllers/auth.controller.js
const Student = require('../models/student.model');
const Admin   = require('../models/admin.model');

// Register a new student profile after Firebase signup
exports.registerStudent = async (req, res) => {
  try {
    const { uid, email, mobile, fullName, school, district, studentDetails } = req.body;
    // Prevent duplicates
    if (await Student.findOne({ uid })) {
      return res.status(400).json({ message: 'Student already registered' });
    }
    const student = new Student({ uid, email, mobile, fullName, school, district, studentDetails });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering student' });
  }
};

// Register a new admin profile after Firebase signup
exports.registerAdmin = async (req, res) => {
  try {
    const { uid, email, mobile, fullName } = req.body;
    if (await Admin.findOne({ uid })) {
      return res.status(400).json({ message: 'Admin already registered' });
    }
    const admin = new Admin({ uid, email, mobile, fullName });
    await admin.save();
    res.status(201).json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering admin' });
  }
};

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const { id, role } = req.user;
    if (role === 'admin') {
      const admin = await Admin.findById(id);
      return res.json(admin);
    }
    const student = await Student.findById(id);
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

// Update current user profile
exports.updateProfile = async (req, res) => {
  try {
    const { id, role } = req.user;
    let updated;
    if (role === 'admin') {
      updated = await Admin.findByIdAndUpdate(id, req.body, { new: true });
      return res.json(updated);
    }
    updated = await Student.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating profile' });
  }
};
