const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/grocerydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// Define a Mongoose Schema and Model for Grocery Items
const grocerySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Grocery = mongoose.model("Grocery", grocerySchema);

// API Endpoints

// GET all grocery items
app.get("/api/groceries", async (req, res) => {
  try {
    const groceries = await Grocery.find();
    res.json(groceries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new grocery item
app.post("/api/groceries", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Name is required" });
    }
    const grocery = new Grocery({ name });
    await grocery.save();
    res.status(201).json(grocery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a grocery item by id
app.delete("/api/groceries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Grocery.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ message: "Item deleted", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
