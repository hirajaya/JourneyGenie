import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    packageName: {
      type: String,
      required: true,
    },
    packageDescription: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    pricePerPerson: {
      type: Number,
      required: true,
    },
    numberOfPersons: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Package = mongoose.model('Package', packageSchema);
export default Package;
