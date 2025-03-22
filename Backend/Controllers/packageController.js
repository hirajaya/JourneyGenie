import Package from '../models/Package.js';

// Create new package
export const createPackage = async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all packages
export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single package by ID
export const getPackageById = async (req, res) => {
  try {
    const pack = await Package.findById(req.params.id);
    if (!pack) return res.status(404).json({ error: 'Package not found' });
    res.status(200).json(pack);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update package
export const updatePackage = async (req, res) => {
  try {
    const updated = await Package.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete package
export const deletePackage = async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Package deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
