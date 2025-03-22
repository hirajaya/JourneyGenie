import dotenv from "dotenv";
import express from "express";
import connectDB from "../Backend/DB/db.js";
import cors from "cors";
import packageRoutes from "./Routes/packageRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/packages', packageRoutes);

app.get("/", (req, res) => {
  res.json({ message: "MongoDB Connection Successful! API is running." });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
