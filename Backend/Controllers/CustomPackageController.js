import Package from '../Models/Package.js';

const destinationRates = {
  "Sigiriya (Lion Rock)": 7000,
  "Anuradhapura": 7200,
  "Polonnaruwa": 7100,
  "Yala National Park": 9500,
  "Nuwara Eliya": 8500,
  "Pinnawala Elephant Orphanage": 7800,
  "Galle": 8200,
  "Mirissa": 8000,
  "Unawatuna": 7900,
  "Temple of the Tooth (Kandy)": 7500,
  "Dambulla Cave Temple": 7400,
  "Ella": 8000,
  "Trincomalee": 7700,
  "Udawalawe National Park": 9000,
  "Horton Plains National Park": 8800,
  "Arugam Bay": 7600,
  "Wilpattu National Park": 9200,
  "Negombo": 7300,
  "Sinharaja Forest Reserve": 8600,
  "Adam's Peak": 7800,
  "Colombo": 7000,
  "Bentota": 7500,
  "Jaffna": 8000,
  "Hikkaduwa": 7900,
  "Kitulgala": 7700
};

export const createPackage = async (req, res) => {
  const { destination, startDate, endDate, numberOfPersons } = req.body;

  try {
    const nights = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    const rate = destinationRates[destination] || 7000;
    const pricePerPerson = rate * nights;
    const totalPrice = pricePerPerson * numberOfPersons;

    const travelPackage = new Package({
      packageName: `Trip to ${destination}`,
      packageDescription: `Enjoy a wonderful ${nights + 1}-day stay in ${destination}.`,
      destination,
      duration: `${nights + 1} days, ${nights} nights`,
      startDate,
      endDate,
      pricePerPerson,
      numberOfPersons,
      totalPrice,
      
    });

    const saved = await travelPackage.save();
    res.json(saved);
     
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};