import dotenv from "dotenv";
import express from "express";
import connectDB from "../Backend/DB/db.js";

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(); 

app.use(express.json());

app.get("/", (req, res) => {
  res.send("MongoDB Connection Successful!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
