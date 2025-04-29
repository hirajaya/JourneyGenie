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

const deletePayment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const payment = await Payment.findById(id);

  if (!payment) {
    return res.status(404).json({ message: 'Payment not found' });
  }

  await payment.deleteOne();

  res.status(200).json({ message: 'Payment deleted successfully' });
});

const getPaymentsByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const payments = await Payment.find({ user: userId }).populate('user', 'name email');

  if (!payments.length) {
    return res.status(404).json({ message: 'No payments found for this user' });
  }

  res.status(200).json(payments);
});



export {makePayment,getAllPayments, deletePayment, getPaymentsByUser}