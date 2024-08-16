const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

//middlewares
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to backend server");
})

app.listen(port, () => {
  console.log("app is running on the port : ", port);
})