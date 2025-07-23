import { 
  createPaymentIntent, 
  confirmPaymentIntent, 
  getPaymentIntent,
  createEasyPaisaPaymentMethod,
  createBankTransferPaymentMethod,
  refundPayment,
  PAYMENT_METHODS 
} from '../lib/stripe.js';
import { successResponse, errorResponse } from '../utils/response.js';

// Create payment intent
export const createPayment = async (req, res) => {
  try {
    const { amount, currency = 'pkr', paymentMethod = 'card', appointmentId, patientId } = req.body;

    console.log('💳 Payment request received:', { amount, currency, paymentMethod, appointmentId, patientId });

    if (!amount || amount <= 0) {
      return errorResponse(res, 'Invalid amount', 400);
    }

    if (!appointmentId) {
      return errorResponse(res, 'Appointment ID is required', 400);
    }

    // Create payment intent
    const paymentIntent = await createPaymentIntent(amount, currency, paymentMethod);

    // Add metadata for tracking
    const updatedPaymentIntent = await stripe.paymentIntents.update(paymentIntent.id, {
      metadata: {
        appointment_id: appointmentId,
        patient_id: patientId,
        payment_method: paymentMethod
      }
    });

    console.log('✅ Payment intent created successfully:', updatedPaymentIntent.id);

    return successResponse(res, {
      clientSecret: updatedPaymentIntent.client_secret,
      paymentIntentId: updatedPaymentIntent.id,
      amount: updatedPaymentIntent.amount / 100,
      currency: updatedPaymentIntent.currency,
      paymentMethod: paymentMethod
    }, 'Payment intent created successfully', 201);

  } catch (error) {
    console.error('❌ Error creating payment:', error);
    return errorResponse(res, 'Failed to create payment', 500, error.message);
  }
};

// Confirm payment
export const confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId, paymentMethodId } = req.body;

    console.log('🔐 Payment confirmation request:', { paymentIntentId, paymentMethodId });

    if (!paymentIntentId) {
      return errorResponse(res, 'Payment intent ID is required', 400);
    }

    // Confirm payment intent
    const paymentIntent = await confirmPaymentIntent(paymentIntentId, paymentMethodId);

    console.log('✅ Payment confirmed successfully:', paymentIntent.status);

    return successResponse(res, {
      status: paymentIntent.status,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency
    }, 'Payment confirmed successfully', 200);

  } catch (error) {
    console.error('❌ Error confirming payment:', error);
    return errorResponse(res, 'Failed to confirm payment', 500, error.message);
  }
};

// Get payment status
export const getPaymentStatus = async (req, res) => {
  try {
    const { paymentIntentId } = req.params;

    console.log('📊 Getting payment status:', paymentIntentId);

    if (!paymentIntentId) {
      return errorResponse(res, 'Payment intent ID is required', 400);
    }

    // Get payment intent
    const paymentIntent = await getPaymentIntent(paymentIntentId);

    console.log('✅ Payment status retrieved:', paymentIntent.status);

    return successResponse(res, {
      status: paymentIntent.status,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      metadata: paymentIntent.metadata
    }, 'Payment status retrieved successfully', 200);

  } catch (error) {
    console.error('❌ Error getting payment status:', error);
    return errorResponse(res, 'Failed to get payment status', 500, error.message);
  }
};

// Create EasyPaisa payment
export const createEasyPaisaPayment = async (req, res) => {
  try {
    const { phoneNumber, amount, appointmentId, patientId } = req.body;

    console.log('📱 EasyPaisa payment request:', { phoneNumber, amount, appointmentId, patientId });

    if (!phoneNumber || !amount || !appointmentId) {
      return errorResponse(res, 'Phone number, amount, and appointment ID are required', 400);
    }

    // Create EasyPaisa payment method
    const paymentMethod = await createEasyPaisaPaymentMethod(phoneNumber);

    // Create payment intent for EasyPaisa
    const paymentIntent = await createPaymentIntent(amount, 'pkr', PAYMENT_METHODS.EASYPAISA);

    // Update payment intent with metadata
    const updatedPaymentIntent = await stripe.paymentIntents.update(paymentIntent.id, {
      metadata: {
        appointment_id: appointmentId,
        patient_id: patientId,
        payment_method: 'easypaisa',
        phone_number: phoneNumber
      }
    });

    console.log('✅ EasyPaisa payment created successfully:', updatedPaymentIntent.id);

    return successResponse(res, {
      clientSecret: updatedPaymentIntent.client_secret,
      paymentIntentId: updatedPaymentIntent.id,
      amount: updatedPaymentIntent.amount / 100,
      currency: updatedPaymentIntent.currency,
      paymentMethod: 'easypaisa',
      phoneNumber: phoneNumber
    }, 'EasyPaisa payment created successfully', 201);

  } catch (error) {
    console.error('❌ Error creating EasyPaisa payment:', error);
    return errorResponse(res, 'Failed to create EasyPaisa payment', 500, error.message);
  }
};

// Create bank transfer payment
export const createBankTransferPayment = async (req, res) => {
  try {
    const { bankDetails, amount, appointmentId, patientId } = req.body;

    console.log('🏦 Bank transfer payment request:', { bankDetails, amount, appointmentId, patientId });

    if (!bankDetails || !amount || !appointmentId) {
      return errorResponse(res, 'Bank details, amount, and appointment ID are required', 400);
    }

    // Create bank transfer payment method
    const paymentMethod = await createBankTransferPaymentMethod(bankDetails);

    // Create payment intent for bank transfer
    const paymentIntent = await createPaymentIntent(amount, 'pkr', PAYMENT_METHODS.BANK_TRANSFER);

    // Update payment intent with metadata
    const updatedPaymentIntent = await stripe.paymentIntents.update(paymentIntent.id, {
      metadata: {
        appointment_id: appointmentId,
        patient_id: patientId,
        payment_method: 'bank_transfer',
        bank_name: bankDetails.bankName,
        account_holder: bankDetails.accountHolderName
      }
    });

    console.log('✅ Bank transfer payment created successfully:', updatedPaymentIntent.id);

    return successResponse(res, {
      clientSecret: updatedPaymentIntent.client_secret,
      paymentIntentId: updatedPaymentIntent.id,
      amount: updatedPaymentIntent.amount / 100,
      currency: updatedPaymentIntent.currency,
      paymentMethod: 'bank_transfer',
      bankDetails: bankDetails
    }, 'Bank transfer payment created successfully', 201);

  } catch (error) {
    console.error('❌ Error creating bank transfer payment:', error);
    return errorResponse(res, 'Failed to create bank transfer payment', 500, error.message);
  }
};

// Process refund
export const processRefund = async (req, res) => {
  try {
    const { paymentIntentId, amount, reason } = req.body;

    console.log('💰 Refund request:', { paymentIntentId, amount, reason });

    if (!paymentIntentId) {
      return errorResponse(res, 'Payment intent ID is required', 400);
    }

    // Process refund
    const refund = await refundPayment(paymentIntentId, amount);

    console.log('✅ Refund processed successfully:', refund.id);

    return successResponse(res, {
      refundId: refund.id,
      amount: refund.amount / 100,
      status: refund.status,
      reason: reason
    }, 'Refund processed successfully', 200);

  } catch (error) {
    console.error('❌ Error processing refund:', error);
    return errorResponse(res, 'Failed to process refund', 500, error.message);
  }
};

// Get payment methods
export const getPaymentMethods = async (req, res) => {
  try {
    console.log('💳 Getting available payment methods');

    const paymentMethods = [
      {
        id: 'credit_card',
        name: 'Credit/Debit Card',
        type: 'card',
        icon: '💳',
        description: 'Pay with Visa, MasterCard, or American Express'
      },
      {
        id: 'easypaisa',
        name: 'EasyPaisa',
        type: 'mobile_money',
        icon: '📱',
        description: 'Pay using EasyPaisa mobile wallet'
      },
      {
        id: 'bank_transfer',
        name: 'Bank Transfer',
        type: 'bank_transfer',
        icon: '🏦',
        description: 'Direct bank transfer to our account'
      }
    ];

    console.log('✅ Payment methods retrieved successfully');

    return successResponse(res, {
      paymentMethods
    }, 'Payment methods retrieved successfully', 200);

  } catch (error) {
    console.error('❌ Error getting payment methods:', error);
    return errorResponse(res, 'Failed to get payment methods', 500, error.message);
  }
}; 