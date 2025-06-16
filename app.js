require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Authentication middleware
const authenticate = require('./middlewares/auth.middleware');

// Route modules
const authRoutes = require('./routes/auth.routes');
const bundleRoutes = require('./routes/bundle.routes');
const paperRoutes = require('./routes/paper.routes');
// const purchaseRoutes = require('./routes/purchase.routes');
// const paymentRoutes = require('./routes/payment.routes');
// const attemptRoutes = require('./routes/attempt.routes');
// const dashboardRoutes = require('./routes/dashboard.routes');
// const adminRoutes = require('./routes/admin.routes');
// const notificationRoutes = require('./routes/notification.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Public routes
app.use('/auth', authRoutes);

// Health-check endpoint
app.get('/', (req, res) => {
  res.send('Punchi5 Backend is running ✅');
});

// Protected routes (require valid Firebase token)
app.use('/bundles', authenticate, bundleRoutes);
app.use('/bundles/:bundleId/papers', authenticate, paperRoutes);
// app.use('/purchases', authenticate, purchaseRoutes);
// app.use('/payments', authenticate, paymentRoutes);
// app.use('/attempts', authenticate, attemptRoutes);
// app.use('/dashboard', authenticate, dashboardRoutes);
// app.use('/admin', authenticate, adminRoutes);
// app.use('/notifications', authenticate, notificationRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('MongoDB error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
