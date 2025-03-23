import Package from "../Models/Package.js";
import Tourist from "../Models/Package.js"; // adjust path if needed

export const createPackage = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    
    const { name, price } = req.body;

    // Basic validation
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required." });
    }

    const newPackage = new Package({ name, price });
    const savedPackage = await newPackage.save();

    res.status(201).json(savedPackage);
  } catch (error) {
    console.error("Error creating package:", error);
    res.status(500).json({ message: "Server error. Could not create package." });
  }
};
