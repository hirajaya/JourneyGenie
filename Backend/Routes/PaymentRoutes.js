import express from 'express';
import { makePayment, getAllPayments, deletePayment, getPaymentsByUser } from "../Controllers/PaymentController.js";

const router = express.Router();

router.post('/', makePayment);
router.get('/', getAllPayments);
router.delete('/:id', deletePayment);
router.get('/user/:userId', getPaymentsByUser);

export default router;
