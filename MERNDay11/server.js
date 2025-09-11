import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
app.use(express.json());

const client = new MongoClient("mongodb://127.0.0.1:27017");
await client.connect();
console.log(" Connected to MongoDB");

const db = client.db("mydb");
const projects = db.collection("projects");
const items = db.collection("items");


app.post("/api/projects", async (req, res) => {
  const result = await projects.insertOne(req.body);
  res.json(result);
});


app.get("/api/projects", async (req, res) => {
  const all = await projects.find().toArray();
  res.json(all);
});

app.put("/api/projects/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await projects.updateOne({ _id: id }, { $set: req.body });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project updated" });
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

app.delete("/api/projects/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await projects.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted" });
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});


app.post("/api/items", async (req, res) => {
  const result = await items.insertOne(req.body);
  res.json(result);
});


app.get("/api/items", async (req, res) => {
  const all = await items.find().toArray();
  res.json(all);
});


app.put("/api/items/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await items.updateOne({ _id: id }, { $set: req.body });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item updated" });
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});


app.delete("/api/items/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await items.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted" });
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

app.listen(3000)
