import asyncHandler from '../middleware/asyncHandler.js';
import Package from '../Models/Package.js';

const createPackage = asyncHandler(async (req, res) => {
  const {
    packageName,
    packageDescription,
    destination,
    duration,
    startDate,
    endDate,
    pricePerPerson,
    numberOfPersons,
    photo,
  } = req.body;

  const totalPrice = pricePerPerson * numberOfPersons;

  const newPackage = new Package({
    packageName,
    packageDescription,
    destination,
    duration,
    startDate,
    endDate,
    pricePerPerson,
    numberOfPersons,
    totalPrice,
    photo,
  });

  const created = await newPackage.save();
  res.status(201).json(created);
});

const getAllPackages = asyncHandler(async (req, res) => {
  const packages = await Package.find({});
  res.json(packages);
});

const getPackageById = asyncHandler(async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  if (!pkg) {
    res.status(404);
    throw new Error('Package not found');
  }
  res.json(pkg);
});

const updatePackage = asyncHandler(async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  if (!pkg) {
    res.status(404);
    throw new Error('Package not found');
  }

  const {
    packageName,
    packageDescription,
    destination,
    duration,
    startDate,
    endDate,
    pricePerPerson,
    numberOfPersons,
    photo,
  } = req.body;

  pkg.packageName = packageName || pkg.packageName;
  pkg.packageDescription = packageDescription || pkg.packageDescription;
  pkg.destination = destination || pkg.destination;
  pkg.duration = duration || pkg.duration;
  pkg.startDate = startDate || pkg.startDate;
  pkg.endDate = endDate || pkg.endDate;
  pkg.pricePerPerson = pricePerPerson || pkg.pricePerPerson;
  pkg.numberOfPersons = numberOfPersons || pkg.numberOfPersons;
  pkg.totalPrice = (pricePerPerson || pkg.pricePerPerson) * (numberOfPersons || pkg.numberOfPersons);
  pkg.photo = photo || pkg.photo;

  const updated = await pkg.save();
  res.json(updated);
});

const deletePackage = asyncHandler(async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  if (!pkg) {
    res.status(404);
    throw new Error('Package not found');
  }
  await pkg.deleteOne();
  res.json({ message: 'Package deleted' });
});

export {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
};
