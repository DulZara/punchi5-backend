require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

(async () => {
  // Connect to MongoDB
  await connectDB();

  // Start the Express server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
  });
})();
