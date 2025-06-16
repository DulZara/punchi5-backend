const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGO_URI is not defined in .env');
    process.exit(1);
  }
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.error("MongoDB connection failed ❌", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

