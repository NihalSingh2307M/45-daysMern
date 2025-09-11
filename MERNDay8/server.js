const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "resumeData";

async function main() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const db = client.db(dbName);
    console.log(`Using database: ${db.databaseName}`);

    // sample input
    const collection = db.collection("profiles");
    const result = await collection.insertOne({ name: "John Doe", role: "Developer" });

    console.log("Inserted document with _id:", result.insertedId);

  } catch (err) {
    console.error("MongoDB connection error:", err);
  } finally {
    await client.close();
  }
}

main();
