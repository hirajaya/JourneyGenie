import express from "express";
import { createTourist } from "../Controllers/TouristController.js";

const router = express.Router();

router.post("/create", createTourist);

export default router;
