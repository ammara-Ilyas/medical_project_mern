import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

// Payment method configurations
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'card',
  BANK_TRANSFER: 'bank_transfer',
  EASYPAISA: 'easypaisa'
};

// Create payment intent with specific payment method
export const createPaymentIntent = async (amount, currency = 'pkr', paymentMethod = 'card') => {
  try {
    console.log('💳 Creating payment intent:', { amount, currency, paymentMethod });
    
    const paymentIntentData = {
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        payment_method: paymentMethod
      }
    };

    // Add specific payment method configurations
    if (paymentMethod === PAYMENT_METHODS.EASYPAISA) {
      paymentIntentData.payment_method_types = ['card'];
      paymentIntentData.metadata.payment_processor = 'easypaisa';
    } else if (paymentMethod === PAYMENT_METHODS.BANK_TRANSFER) {
      paymentIntentData.payment_method_types = ['bank_transfer'];
    }

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentData);
    
    console.log('✅ Payment intent created:', paymentIntent.id);
    return paymentIntent;
  } catch (error) {
    console.error('❌ Error creating payment intent:', error);
    throw error;
  }
};

// Confirm payment intent
export const confirmPaymentIntent = async (paymentIntentId, paymentMethodId) => {
  try {
    console.log('🔐 Confirming payment intent:', paymentIntentId);
    
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethodId,
    });
    
    console.log('✅ Payment intent confirmed:', paymentIntent.status);
    return paymentIntent;
  } catch (error) {
    console.error('❌ Error confirming payment intent:', error);
    throw error;
  }
};

// Get payment intent status
export const getPaymentIntent = async (paymentIntentId) => {
  try {
    console.log('📊 Getting payment intent:', paymentIntentId);
    
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    console.log('✅ Payment intent retrieved:', paymentIntent.status);
    return paymentIntent;
  } catch (error) {
    console.error('❌ Error retrieving payment intent:', error);
    throw error;
  }
};

// Create EasyPaisa payment method
export const createEasyPaisaPaymentMethod = async (phoneNumber) => {
  try {
    console.log('📱 Creating EasyPaisa payment method:', phoneNumber);
    
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        token: 'tok_easypaisa', // This would be replaced with actual EasyPaisa integration
      },
      billing_details: {
        phone: phoneNumber,
      },
      metadata: {
        payment_processor: 'easypaisa',
        phone_number: phoneNumber
      }
    });
    
    console.log('✅ EasyPaisa payment method created:', paymentMethod.id);
    return paymentMethod;
  } catch (error) {
    console.error('❌ Error creating EasyPaisa payment method:', error);
    throw error;
  }
};

// Create bank transfer payment method
export const createBankTransferPaymentMethod = async (bankDetails) => {
  try {
    console.log('🏦 Creating bank transfer payment method:', bankDetails);
    
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'bank_transfer',
      bank_transfer: {
        type: 'gb_bank_transfer',
        account_holder_name: bankDetails.accountHolderName,
        account_number: bankDetails.accountNumber,
        sort_code: bankDetails.sortCode,
      },
      billing_details: {
        name: bankDetails.accountHolderName,
      },
      metadata: {
        payment_processor: 'bank_transfer',
        bank_name: bankDetails.bankName
      }
    });
    
    console.log('✅ Bank transfer payment method created:', paymentMethod.id);
    return paymentMethod;
  } catch (error) {
    console.error('❌ Error creating bank transfer payment method:', error);
    throw error;
  }
};

// Refund payment
export const refundPayment = async (paymentIntentId, amount = null) => {
  try {
    console.log('💰 Processing refund:', paymentIntentId);
    
    const refundData = {
      payment_intent: paymentIntentId,
    };
    
    if (amount) {
      refundData.amount = Math.round(amount * 100);
    }
    
    const refund = await stripe.refunds.create(refundData);
    
    console.log('✅ Refund processed:', refund.id);
    return refund;
  } catch (error) {
    console.error('❌ Error processing refund:', error);
    throw error;
  }
};

export default stripe; 