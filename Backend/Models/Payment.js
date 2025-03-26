import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['Credit Card', 'Debit Card', 'UPI', 'PayPal'],
      required: true,
    },
    cardNumber: String,
    cardHolder: String,
    status: {
      type: String,
      enum: ['Success', 'Failed'],
      default: 'Success',
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
