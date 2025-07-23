import express from 'express';
import {
  createPayment,
  confirmPayment,
  getPaymentStatus,
  createEasyPaisaPayment,
  createBankTransferPayment,
  processRefund,
  getPaymentMethods
} from '../controllers/payment.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get available payment methods
router.get('/methods', getPaymentMethods);

// Create payment intent
router.post('/create', protect, createPayment);

// Confirm payment
router.post('/confirm', protect, confirmPayment);

// Get payment status
router.get('/status/:paymentIntentId', protect, getPaymentStatus);

// EasyPaisa payment
router.post('/easypaisa', protect, createEasyPaisaPayment);

// Bank transfer payment
router.post('/bank-transfer', protect, createBankTransferPayment);

// Process refund
router.post('/refund', protect, processRefund);

export default router; 