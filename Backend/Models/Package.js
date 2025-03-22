import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  packageName: { type: String, required: true },
  packageDescription: { type: String, required: true },
  destination: { type: String, required: true },
  duration: { type: String, required: true }, // e.g. "5 days, 4 nights"
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  pricePerPerson: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  modeOfTransportation: { type: String, required: true },
  ageGroup: { type: String, required: true }, // e.g. "18-40"
  photo: { type: String }, // URL or path to the photo
}, {
  timestamps: true
});

const Package = mongoose.model('Package', packageSchema);
export default Package;
