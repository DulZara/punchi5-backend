const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json"); // we'll add this file next

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
