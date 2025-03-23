import express from "express";
import { createPackage } from "../Controllers/PackageController.js";

const router = express.Router();

router.post("/create", createPackage);

export default router;
