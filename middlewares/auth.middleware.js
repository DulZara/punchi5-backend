// middlewares/auth.middleware.js

const admin = require('../config/firebase');
const Student = require('../models/student.model');
const Admin = require('../models/admin.model');

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }
  const idToken = authHeader.split(' ')[1];

  try {
    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Look up the user in your DB
    let user = await Admin.findOne({ uid }) || await Student.findOne({ uid });
    if (!user) {
      return res.status(403).json({ message: 'User not found' });
    }

    // Attach minimal info
    req.user = {
      id: user._id,
      uid,
      role: user.role ?? 'student'
    };
    next();
  } catch (err) {
    console.error('Auth error:', err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = authenticate;

