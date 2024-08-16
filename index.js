const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const { MongoClient, ServerApiVersion, Collection } = require('mongodb');
const port = process.env.PORT || 5000;

//middlewares
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}));
app.use(express.json());


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.1vrkz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    // Collections
    const database = client.db("ProductDB");
    const productCollection = database.collection("products")

    // to get products data from server
    app.get("/products", async(req, res) => {
      const cursor = productCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get("/", (req, res) => {
  res.send("welcome to backend server");
})

app.listen(port, () => {
  console.log("app is running on the port : ", port);
})