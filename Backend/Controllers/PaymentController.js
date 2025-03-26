import Payment from "../Models/Payment.js";
import asyncHandler from '../middleware/asyncHandler.js';

const makePayment = asyncHandler(async (req, res) => {
  const { user, packageId, amount, paymentMethod, cardNumber, cardHolder } = req.body;

  if (!user || !packageId || !amount || !paymentMethod) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const payment = new Payment({
    user,
    package: packageId,
    amount,
    paymentMethod,
    cardNumber,
    cardHolder,
  });

  const saved = await payment.save();
  res.status(201).json({ message: 'Payment successful', payment: saved });
});

const getAllPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find().populate('user', 'name').populate('package', 'packageName');
  res.status(200).json(payments);
});

export {makePayment,getAllPayments}