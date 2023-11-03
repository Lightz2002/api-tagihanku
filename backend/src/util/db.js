// db.js

const mongoose = require('mongoose');

const dbType = process.env.DB_TYPE;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const connectionURI = `${dbType}://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`; // Replace with your MongoDB connectionURI

/**
 * Connect to db
 * @return {null} null
 */
async function connectToDatabase() {
  try {
    await mongoose.connect(connectionURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = { connectToDatabase, connectionURI };
