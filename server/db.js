const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://shineleo19:shineleo@2006@cluster0.uhrnade.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");
    return client.db("myDatabase"); // replace with your DB name
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

module.exports = connectDB;
