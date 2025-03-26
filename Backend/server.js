import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors";
import UserRoutes from "./Routes/UserRoutes.js"
import PackageRoutes from "./Routes/PackageRoutes.js"
import ReviewRoutes from "./Routes/ReviewRoutes.js"
import CustomPackageRoutes from "./Routes/CustomPackageRoutes.js"
import PaymentRoutes from "./Routes/PaymentRoutes.js"
import connectDB from "../Backend/DB/db.js";

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(); 

app.use(cors({
  origin: "http://localhost:5175", 
  credentials: true               
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/api/users", UserRoutes);
app.use("/api/packages", PackageRoutes);
app.use("/api/reviews", ReviewRoutes);
app.use('/api/custom', CustomPackageRoutes);
app.use('/api/payments', PaymentRoutes);

app.get("/", (req, res) => {
  res.send("MongoDB Connection Successful!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
