'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useToast } from '@/context/ToastContext';
import { paymentsAPI } from '@/services/api';

// Load Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_publishable_key');

interface PaymentFormProps {
  amount: number;
  appointmentId: string;
  patientId: string;
  onPaymentSuccess: (paymentData: any) => void;
  onPaymentError: (error: string) => void;
}

interface PaymentMethod {
  id: string;
  name: string;
  type: string;
  icon: string;
  description: string;
}

const PaymentFormContent: React.FC<PaymentFormProps> = ({ 
  amount, 
  appointmentId, 
  patientId, 
  onPaymentSuccess, 
  onPaymentError 
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { showToast } = useToast();
  
  const [selectedMethod, setSelectedMethod] = useState<string>('credit_card');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [easyPaisaPhone, setEasyPaisaPhone] = useState('');
  const [bankDetails, setBankDetails] = useState({
    accountHolderName: '',
    accountNumber: '',
    bankName: '',
    sortCode: ''
  });

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      console.log('💳 Fetching payment methods...');
      
      const response = await paymentsAPI.getMethods();
      
      if (response.success) {
        setPaymentMethods(response.data.paymentMethods);
        console.log('✅ Payment methods loaded:', response.data.paymentMethods);
      }
    } catch (error) {
      console.error('❌ Error fetching payment methods:', error);
    }
  };

  const handlePayment = async () => {
    if (!stripe || !elements) {
      showToast('Stripe is not loaded', 'error');
      return;
    }

    setIsLoading(true);
    console.log('💳 Processing payment:', { selectedMethod, amount, appointmentId });

    try {
      let paymentData;

      switch (selectedMethod) {
        case 'credit_card':
          paymentData = await handleCreditCardPayment();
          break;
        case 'easypaisa':
          paymentData = await handleEasyPaisaPayment();
          break;
        case 'bank_transfer':
          paymentData = await handleBankTransferPayment();
          break;
        default:
          throw new Error('Invalid payment method');
      }

      if (paymentData) {
        showToast('Payment successful!', 'success');
        onPaymentSuccess(paymentData);
        console.log('✅ Payment completed successfully:', paymentData);
      }

    } catch (error) {
      console.error('❌ Payment error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Payment failed';
      showToast(errorMessage, 'error');
      onPaymentError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreditCardPayment = async () => {
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) throw new Error('Card element not found');

    // Create payment intent
    const response = await paymentsAPI.createPayment({
      amount,
      currency: 'pkr',
      paymentMethod: 'card',
      appointmentId,
      patientId
    });

    if (!response.success) throw new Error(response.message);

    // Confirm payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(response.data.clientSecret, {
      payment_method: {
        card: cardElement,
      }
    });

    if (error) throw new Error(error.message);

    return paymentIntent;
  };

  const handleEasyPaisaPayment = async () => {
    if (!easyPaisaPhone) throw new Error('Phone number is required');

    const response = await paymentsAPI.createEasyPaisaPayment({
      phoneNumber: easyPaisaPhone,
      amount,
      appointmentId,
      patientId
    });

    if (!response.success) throw new Error(response.message);

    return response.data;
  };

  const handleBankTransferPayment = async () => {
    if (!bankDetails.accountHolderName || !bankDetails.accountNumber || !bankDetails.bankName) {
      throw new Error('Bank details are required');
    }

    const response = await paymentsAPI.createBankTransferPayment({
      bankDetails,
      amount,
      appointmentId,
      patientId
    });

    if (!response.success) throw new Error(response.message);

    return response.data;
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Details</h3>
      
      {/* Amount Display */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Total Amount:</span>
          <span className="text-2xl font-bold text-blue-600">₨{amount.toLocaleString()}</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h4>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <label key={method.id} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="mr-3"
              />
              <div className="flex items-center">
                <span className="text-2xl mr-3">{method.icon}</span>
                <div>
                  <div className="font-medium text-gray-900">{method.name}</div>
                  <div className="text-sm text-gray-500">{method.description}</div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Credit Card Form */}
      {selectedMethod === 'credit_card' && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Card Information</h4>
          <div className="border rounded-lg p-4">
            <CardElement options={cardElementOptions} />
          </div>
        </div>
      )}

      {/* EasyPaisa Form */}
      {selectedMethod === 'easypaisa' && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">EasyPaisa Details</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={easyPaisaPhone}
                onChange={(e) => setEasyPaisaPhone(e.target.value)}
                placeholder="03XXXXXXXXX"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                💡 You will receive an SMS to confirm the payment. Please enter the code when prompted.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bank Transfer Form */}
      {selectedMethod === 'bank_transfer' && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Bank Transfer Details</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Holder Name
              </label>
              <input
                type="text"
                value={bankDetails.accountHolderName}
                onChange={(e) => setBankDetails({...bankDetails, accountHolderName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Number
              </label>
              <input
                type="text"
                value={bankDetails.accountNumber}
                onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Name
              </label>
              <input
                type="text"
                value={bankDetails.bankName}
                onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                🏦 Transfer the amount to our account and upload the receipt for confirmation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Pay Button */}
      <button
        onClick={handlePayment}
        disabled={isLoading || !stripe}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing Payment...
          </div>
        ) : (
          `Pay ₨${amount.toLocaleString()}`
        )}
      </button>

      {/* Security Notice */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          🔒 Your payment information is secure and encrypted
        </p>
      </div>
    </div>
  );
};

const PaymentForm: React.FC<PaymentFormProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentFormContent {...props} />
    </Elements>
  );
};

export default PaymentForm; 