import Tourist from "../Models/Tourist.js"; // adjust path if needed

export const createTourist = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    
    const { name, country } = req.body;

    // Basic validation
    if (!name || !country) {
      return res.status(400).json({ message: "Name and country are required." });
    }

    const newTourist = new Tourist({ name, country });
    const savedTourist = await newTourist.save();

    res.status(201).json(savedTourist);
  } catch (error) {
    console.error("Error creating tourist:", error);
    res.status(500).json({ message: "Server error. Could not create tourist." });
  }
};
