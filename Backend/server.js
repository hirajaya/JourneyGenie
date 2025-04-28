import dotenv from "dotenv";
import express from "express";
import connectDB from "../Backend/DB/db.js";
import cors from "cors";
import reviewRoutes from "./Routes/ReviewRoutes.js";
import packageRoutes from "./Routes/PackageRoutes.js";
import paymentRoutes from "./Routes/PaymentRoutes.js";

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(); 

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("MongoDB Connection Successful!");
});

app.use("/api/reviews", reviewRoutes);

app.use("/api/packages", packageRoutes);

app.use('/api/payments', paymentRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
