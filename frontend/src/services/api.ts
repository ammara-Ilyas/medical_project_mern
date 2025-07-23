// const HOSTNAME = "https://ecommerce-apis-hl5w.onrender.com/api";
const HOSTNAME = "http://localhost:5000/api";

// Add types for parameters
const callPrivateApi = async (
  endpoint: string,
  method: string,
  payload?: any,
  token?: string
) => {
  const headers: Record<string, string> = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  let body;

  if (payload !== undefined && !(payload instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(payload);
  } else if (payload instanceof FormData) {
    body = payload;
  }

  try {
    const response = await fetch(`${HOSTNAME}${endpoint}`, {
      method,
      headers,
      body: method !== "GET" && payload !== undefined ? body : undefined,
    });
    console.log("token", token);

    const contentType = response.headers.get("content-type");
    if (!response.ok) {
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw errorData;
      } else {
        const text = await response.text();
        throw new Error(`API Error: ${response.status} - ${text.substring(0, 100)}`);
      }
    }
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      const text = await response.text();
      throw new Error(`API Error: Expected JSON but got: ${text.substring(0, 100)}`);
    }
  } catch (error) {
    if (typeof error === 'string') throw new Error(error);
    throw error;
  }
};

const callPublicApi = async (
  endpoint: string,
  method: string,
  payload?: any
) => {
  let headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  let body: any = null;

  if (payload instanceof FormData) {
    body = payload;
    // Remove Content-Type, browser set karega
    if (headers["Content-Type"]) delete headers["Content-Type"];
  } else if (payload) {
    body = JSON.stringify(payload);
  }

  console.log("payload", payload);
  console.log("body", body);

  try {
    const response = await fetch(`${HOSTNAME}${endpoint}`, {
      method,
      headers,
      body: method !== "GET" ? body : undefined,
    });

    const contentType = response.headers.get("content-type");
    if (!response.ok) {
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw errorData;
      } else {
        const text = await response.text();
        throw new Error(`API Error: ${response.status} - ${text.substring(0, 100)}`);
      }
    }
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      const text = await response.text();
      throw new Error(`API Error: Expected JSON but got: ${text.substring(0, 100)}`);
    }
  } catch (error) {
    if (typeof error === 'string') throw new Error(error);
    throw error;
  }
};

// Helper function to get auth token
const getAuthToken = (): string | undefined => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token') || undefined;
  }
  return undefined;
};

// Auth API
export const authAPI = {
  // Login
  login: async (credentials: { email: string; password: string }) => {
    console.log('🔐 Login request:', credentials);
    return callPublicApi('/auth/login', 'POST', credentials);
  },

  // Register
  register: async (userData: { email: string; password: string; name: string }) => {
    console.log('📝 Register request:', userData);
    return callPublicApi('/auth/register', 'POST', userData);
  },

  // Get current user
  getCurrentUser: async () => {
    const token = getAuthToken();
    console.log('👤 Getting current user');
    return callPrivateApi('/auth/me', 'GET', undefined, token);
  },

  // Logout
  logout: async () => {
    const token = getAuthToken();
    console.log('🚪 Logout request');
    return callPrivateApi('/auth/logout', 'POST', undefined, token);
  },
};

// Appointments API
export const appointmentsAPI = {
  // Get all appointments (admin)
  getAll: async (filters: { [key: string]: any } = {}) => {
    const token = getAuthToken();
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value.toString());
    });
    
    console.log('📋 Getting all appointments with filters:', filters);
    return callPrivateApi(`/appointments?${params.toString()}`, 'GET', undefined, token);
  },

  // Get user appointments
  getUserAppointments: async () => {
    const token = getAuthToken();
    console.log('👤 Getting user appointments');
    return callPrivateApi('/appointments/user', 'GET', undefined, token);
  },

  // Create appointment
  create: async (appointmentData: {
    appointmentDate: string;
    appointmentTime: string;
    doctorId: string;
    userId: string;
    status: string;
  }) => {
    const token = getAuthToken();
    console.log('📅 Creating appointment:', appointmentData);
    return callPrivateApi('/appointments', 'POST', appointmentData, token);
  },

  // Update appointment
  update: async (id: string, updateData: { [key: string]: any }) => {
    const token = getAuthToken();
    console.log('✏️ Updating appointment:', id, updateData);
    return callPrivateApi(`/appointments/${id}`, 'PUT', updateData, token);
  },

  // Delete appointment
  delete: async (id: string) => {
    const token = getAuthToken();
    console.log('🗑️ Deleting appointment:', id);
    return callPrivateApi(`/appointments/${id}`, 'DELETE', undefined, token);
  },

  // Get appointment by ID
  getById: async (id: string) => {
    const token = getAuthToken();
    console.log('🔍 Getting appointment by ID:', id);
    return callPrivateApi(`/appointments/${id}`, 'GET', undefined, token);
  },

  // Cancel appointment
  cancel: async (id: string) => {
    const token = getAuthToken();
    console.log('❌ Cancelling appointment:', id);
    return callPrivateApi(`/appointments/${id}/cancel`, 'PUT', undefined, token);
  },

  // Reschedule appointment
  reschedule: async (id: string, newDate: string, newTime: string) => {
    const token = getAuthToken();
    const rescheduleData = { appointmentDate: newDate, appointmentTime: newTime };
    console.log('🔄 Rescheduling appointment:', id, rescheduleData);
    return callPrivateApi(`/appointments/${id}/reschedule`, 'PUT', rescheduleData, token);
  },

  // Get available days for booking
  getAvailableDays: async () => {
    return callPublicApi('/appointments/available-days', 'GET');
  },

  // Get available slots for a specific date and doctor
  getAvailableSlots: async (date: string, doctorId: string) => {
    const params = new URLSearchParams({ date });
    if (doctorId) params.append('doctorId', doctorId);
    return callPublicApi(`/appointments/available-slots?${params.toString()}`, 'GET');
  },
};

// Payments API
export const paymentsAPI = {
  // Get payment methods
  getMethods: async () => {
    console.log('💳 Getting payment methods');
    return callPublicApi('/payments/methods', 'GET');
  },

  // Create payment intent
  createPayment: async (paymentData: {
    amount: number;
    currency: string;
    paymentMethod: string;
    appointmentId: string;
  }) => {
    const token = getAuthToken();
    console.log('💳 Creating payment:', paymentData);
    return callPrivateApi('/payments/create', 'POST', paymentData, token);
  },

  // Confirm payment
  confirmPayment: async (paymentData: {
    paymentIntentId: string;
    paymentMethod: string;
  }) => {
    const token = getAuthToken();
    console.log('🔐 Confirming payment:', paymentData);
    return callPrivateApi('/payments/confirm', 'POST', paymentData, token);
  },

  // Get payment status
  getPaymentStatus: async (paymentIntentId: string) => {
    const token = getAuthToken();
    console.log('📊 Getting payment status:', paymentIntentId);
    return callPrivateApi(`/payments/status/${paymentIntentId}`, 'GET', undefined, token);
  },

  // EasyPaisa payment
  createEasyPaisaPayment: async (paymentData: {
    amount: number;
    currency: string;
    appointmentId: string;
  }) => {
    const token = getAuthToken();
    console.log('📱 Creating EasyPaisa payment:', paymentData);
    return callPrivateApi('/payments/easypaisa', 'POST', paymentData, token);
  },

  // Bank transfer payment
  createBankTransferPayment: async (paymentData: {
    amount: number;
    currency: string;
    appointmentId: string;
  }) => {
    const token = getAuthToken();
    console.log('🏦 Creating bank transfer payment:', paymentData);
    return callPrivateApi('/payments/bank-transfer', 'POST', paymentData, token);
  },

  // Process refund
  processRefund: async (refundData: {
    paymentIntentId: string;
    reason: string;
  }) => {
    const token = getAuthToken();
    console.log('💰 Processing refund:', refundData);
    return callPrivateApi('/payments/refund', 'POST', refundData, token);
  },
};

// Doctors API
export const doctorsAPI = {
  // Get all doctors
  getAll: async (filters: { [key: string]: any } = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value.toString());
    });
    
    console.log('👨‍⚕️ Getting doctors with filters:', filters);
    return callPublicApi(`/doctors?${params.toString()}`, 'GET');
  },

  // Get doctor by ID
  getById: async (id: string) => {
    console.log('🔍 Getting doctor by ID:', id);
    return callPublicApi(`/doctors/${id}`, 'GET');
  },

  // Create doctor (admin)
  create: async (doctorData: any) => {
    const token = getAuthToken();
    if (doctorData instanceof FormData) {
      console.log('➕ Creating doctor with FormData');
    } else {
      console.log('➕ Creating doctor:', doctorData);
    }
    return callPrivateApi('/doctors', 'POST', doctorData, token);
  },

  // Update doctor (admin)
  update: async (id: string, updateData: any) => {
    const token = getAuthToken();
    if (updateData instanceof FormData) {
      console.log('✏️ Updating doctor with FormData:', id);
    } else {
      console.log('✏️ Updating doctor:', id, updateData);
    }
    return callPrivateApi(`/doctors/${id}`, 'PUT', updateData, token);
  },

  // Delete doctor (admin)
  delete: async (id: string) => {
    const token = getAuthToken();
    console.log('🗑️ Deleting doctor:', id);
    return callPrivateApi(`/doctors/${id}`, 'DELETE', undefined, token);
  },

  // Get doctor availability
  getAvailability: async (id: string, date: string) => {
    console.log('📅 Getting doctor availability:', id, date);
    return callPublicApi(`/doctors/${id}/availability?date=${date}`, 'GET');
  },
};

// News API
export const newsAPI = {
  // Get all news
  getAll: async (filters: { [key: string]: any } = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value.toString());
    });
    
    console.log('📰 Getting news with filters:', filters);
    return callPublicApi(`/news?${params.toString()}`, 'GET');
  },

  // Get news by ID
  getById: async (id: string) => {
    console.log('🔍 Getting news by ID:', id);
    return callPublicApi(`/news/${id}`, 'GET');
  },

  // Create news (admin)
  create: async (newsData: {
    title: string;
    content: string;
    author: string;
  }) => {
    const token = getAuthToken();
    console.log('➕ Creating news:', newsData);
    return callPrivateApi('/news', 'POST', newsData, token);
  },

  // Update news (admin)
  update: async (id: string, updateData: { [key: string]: any }) => {
    const token = getAuthToken();
    console.log('✏️ Updating news:', id, updateData);
    return callPrivateApi(`/news/${id}`, 'PUT', updateData, token);
  },

  // Delete news (admin)
  delete: async (id: string) => {
    const token = getAuthToken();
    console.log('🗑️ Deleting news:', id);
    return callPrivateApi(`/news/${id}`, 'DELETE', undefined, token);
  },
};

// Categories API
export const categoriesAPI = {
  // Get all categories
  getAll: async () => {
    console.log('📂 Getting all categories');
    return callPublicApi('/categories', 'GET');
  },

  // Create category (admin)
  create: async (categoryData: { name: string }) => {
    const token = getAuthToken();
    console.log('➕ Creating category:', categoryData);
    return callPrivateApi('/categories', 'POST', categoryData, token);
  },

  // Update category (admin)
  update: async (id: string, updateData: { [key: string]: any }) => {
    const token = getAuthToken();
    console.log('✏️ Updating category:', id, updateData);
    return callPrivateApi(`/categories/${id}`, 'PUT', updateData, token);
  },

  // Delete category (admin)
  delete: async (id: string) => {
    const token = getAuthToken();
    console.log('🗑️ Deleting category:', id);
    return callPrivateApi(`/categories/${id}`, 'DELETE', undefined, token);
  },
};

// Users API
export const usersAPI = {
  // Get all users (admin)
  getAll: async (filters: { [key: string]: any } = {}) => {
    const token = getAuthToken();
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value.toString());
    });
    
    console.log('👥 Getting users with filters:', filters);
    return callPrivateApi(`/users?${params.toString()}`, 'GET', undefined, token);
  },

  // Get user by ID
  getById: async (id: string) => {
    const token = getAuthToken();
    console.log('🔍 Getting user by ID:', id);
    return callPrivateApi(`/users/${id}`, 'GET', undefined, token);
  },

  // Update user profile
  updateProfile: async (updateData: { [key: string]: any }) => {
    const token = getAuthToken();
    console.log('✏️ Updating user profile:', updateData);
    return callPrivateApi('/users/profile', 'PUT', updateData, token);
  },

  // Delete user (admin)
  delete: async (id: string) => {
    const token = getAuthToken();
    console.log('🗑️ Deleting user:', id);
    return callPrivateApi(`/users/${id}`, 'DELETE', undefined, token);
  },
};

// Dashboard Stats API
export const dashboardAPI = {
  // Get admin dashboard stats
  getAdminStats: async () => {
    const token = getAuthToken();
    console.log('📊 Getting admin dashboard stats');
    return callPrivateApi('/dashboard/admin-stats', 'GET', undefined, token);
  },

  // Get appointment stats
  getAppointmentStats: async () => {
    const token = getAuthToken();
    console.log('📅 Getting appointment stats');
    return callPrivateApi('/dashboard/appointment-stats', 'GET', undefined, token);
  },

  // Get doctor stats
  getDoctorStats: async () => {
    const token = getAuthToken();
    console.log('👨‍⚕️ Getting doctor stats');
    return callPrivateApi('/dashboard/doctor-stats', 'GET', undefined, token);
  },

  // Get news stats
  getNewsStats: async () => {
    const token = getAuthToken();
    console.log('📰 Getting news stats');
    return callPrivateApi('/dashboard/news-stats', 'GET', undefined, token);
  },
};

// Services API
export const servicesAPI = {
  // Get all services
  getAll: async () => {
    return callPublicApi('/services', 'GET');
  },
  // Get service by ID or slug
  getById: async (id: string) => {
    return callPublicApi(`/services/${id}`, 'GET');
  },
  // Create service
  create: async (serviceData: any) => {
    const token = getAuthToken();
    return callPrivateApi('/services', 'POST', serviceData, token);
  },
  // Update service
  update: async (id: string, updateData: any) => {
    const token = getAuthToken();
    return callPrivateApi(`/services/${id}`, 'PUT', updateData, token);
  },
  // Delete service
  delete: async (id: string) => {
    const token = getAuthToken();
    return callPrivateApi(`/services/${id}`, 'DELETE', undefined, token);
  },
};

export { callPublicApi, callPrivateApi }; 