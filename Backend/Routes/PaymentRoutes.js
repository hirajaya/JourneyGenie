
import express from 'express';
import { makePayment, getAllPayments } from "../Controllers/PaymentController.js";

const router = express.Router();

router.post('/', makePayment);
router.get('/', getAllPayments);

export default router;
