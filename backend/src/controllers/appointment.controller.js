import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import User from "../models/User.js";
import { asyncHandler } from "../middleware/error.js";
import { successResponse, errorResponse } from "../utils/response.js"
import { sendOTPEmail } from "../../lib/nodemailer.js";

// @desc    Create appointment
// @route   POST /api/appointments
// @access  Private (Patient)
export const createAppointment = asyncHandler(async (req, res) => {
  const { doctorId, appointmentDate, appointmentTime, reason, type = "in-person" } = req.body;
  const patientId = req.user.id;

  // Validate required fields
  if (!doctorId || !appointmentDate || !appointmentTime || !reason) {
    return errorResponse(res, "Missing required fields", 400);
  }

  // Validate allowed day (no Sunday)
  const appointmentDateObj = new Date(appointmentDate);
  const weekday = appointmentDateObj.toLocaleDateString('en-US', { weekday: 'long' });
  if (weekday === 'Sunday') {
    return errorResponse(res, 'Appointments cannot be booked on Sunday', 400);
  }

  // Validate allowed slot
  const allowedSlots = getSlotsForDay(weekday);
  if (!allowedSlots.includes(appointmentTime)) {
    return errorResponse(res, 'Invalid or unavailable time slot for this day', 400);
  }

  // Check if doctor exists
  const doctor = await Doctor.findById(doctorId).populate("user");
  if (!doctor) {
    return errorResponse(res, "Doctor not found", 404);
  }

  // Check if patient exists
  const patient = await User.findById(patientId);
  if (!patient) {
    return errorResponse(res, "Patient not found", 404);
  }

  // Check for double booking
  const existingAppointment = await Appointment.findOne({
    doctor: doctorId,
    appointmentDate: appointmentDateObj,
    appointmentTime: appointmentTime,
    status: { $in: ["pending", "confirmed"] }
  });
  if (existingAppointment) {
    return errorResponse(res, "This time slot is already booked", 400);
  }

  // Create appointment
  const appointment = await Appointment.create({
    patient: patientId,
    doctor: doctorId,
    appointmentDate,
    appointmentTime,
    reason,
    type,
    payment: {
      amount: doctor.consultationFee
    }
  });

  await appointment.populate([
    { path: "patient", select: "name email" },
    { path: "doctor", populate: { path: "user", select: "name" } }
  ]);

  if (patient.email) {
    const html = `<p>Dear ${patient.name},</p>
      <p>Your appointment has been booked for <b>${appointmentDate}</b> at <b>${appointmentTime}</b> with Dr. ${doctor.user.name}.</p>
      <p>Thank you for choosing us!</p>`;
    sendOTPEmail(patient.name, patient.email, html);
  }

  successResponse(res, appointment, "Appointment created successfully", 201);
});

// @desc    Get all appointments (Admin)
// @route   GET /api/appointments
// @access  Private (Admin)
export const getAllAppointments = asyncHandler(async (req, res) => {
  const { 
    doctor, 
    patient, 
    status, 
    date, 
    page = 1, 
    limit = 10,
    startDate,
    endDate
  } = req.query;

  const query = {};

  // Build filter query
  if (doctor) query.doctor = doctor;
  if (patient) query.patient = patient;
  if (status) query.status = status;
  if (date) query.appointmentDate = date;
  if (startDate && endDate) {
    query.appointmentDate = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  const skip = (page - 1) * limit;

  const appointments = await Appointment.find(query)
    .populate([
      { path: "patient", select: "name email" },
      { path: "doctor", populate: { path: "user", select: "name" } }
    ])
    .sort({ appointmentDate: -1, appointmentTime: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Appointment.countDocuments(query);

  successResponse(res, {
    appointments,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  }, "Appointments retrieved successfully", 200);
});

// @desc    Get user appointments
// @route   GET /api/appointments/user
// @access  Private (User)
export const getUserAppointments = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;
  const userId = req.user.id;

  const query = { patient: userId };
  if (status) query.status = status;

  const skip = (page - 1) * limit;

  const appointments = await Appointment.find(query)
    .populate([
      { path: "doctor", populate: { path: "user", select: "name" } }
    ])
    .sort({ appointmentDate: -1, appointmentTime: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Appointment.countDocuments(query);

  successResponse(res, {
    appointments,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  }, "User appointments retrieved successfully", 200);
});

// @desc    Get doctor appointments
// @route   GET /api/appointments/doctor
// @access  Private (Doctor)
export const getDoctorAppointments = asyncHandler(async (req, res) => {
  const { status, date, page = 1, limit = 10 } = req.query;
  const doctorId = req.user.doctorId; // Assuming user has doctorId field

  if (!doctorId) {
    return errorResponse(res, "User is not a doctor", 400);
  }

  const query = { doctor: doctorId };
  if (status) query.status = status;
  if (date) query.appointmentDate = date;

  const skip = (page - 1) * limit;

  const appointments = await Appointment.find(query)
    .populate([
      { path: "patient", select: "name email" }
    ])
    .sort({ appointmentDate: -1, appointmentTime: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Appointment.countDocuments(query);

  successResponse(res, {
    appointments,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  }, "Doctor appointments retrieved successfully", 200);
});

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
export const getAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id)
    .populate([
      { path: "patient", select: "name email" },
      { path: "doctor", populate: { path: "user", select: "name" } }
    ]);

  if (!appointment) {
    return errorResponse(res, "Appointment not found", 404);
  }

  // Check if user has access to this appointment
  if (req.user.role !== "admin" && 
      appointment.patient.toString() !== req.user.id &&
      appointment.doctor.toString() !== req.user.doctorId) {
    return errorResponse(res, "Not authorized to access this appointment", 403);
  }

  successResponse(res, appointment, "Appointment retrieved successfully", 200);
});

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
export const updateAppointment = asyncHandler(async (req, res) => {
  const { status, appointmentDate, appointmentTime, reason, notes, prescription } = req.body;

  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    return errorResponse(res, "Appointment not found", 404);
  }

  // Check if user has permission to update
  if (req.user.role !== "admin" && 
      appointment.patient.toString() !== req.user.id &&
      appointment.doctor.toString() !== req.user.doctorId) {
    return errorResponse(res, "Not authorized to update this appointment", 403);
  }

  // If rescheduling, check availability
  if (appointmentDate && appointmentTime) {
    const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
    const dayOfWeek = appointmentDateTime.toLocaleDateString('en-US', { weekday: 'lowercase' });
    
    const doctor = await Doctor.findById(appointment.doctor);
    const availability = doctor.availability.find(avail => avail.day === dayOfWeek);
    
    if (!availability || !availability.isAvailable) {
      return errorResponse(res, "Doctor is not available on this day", 400);
    }

    // Check for double booking (excluding current appointment)
    const existingAppointment = await Appointment.findOne({
      doctor: appointment.doctor,
      appointmentDate: appointmentDate,
      appointmentTime: appointmentTime,
      status: { $in: ["pending", "confirmed"] },
      _id: { $ne: req.params.id }
    });

    if (existingAppointment) {
      return errorResponse(res, "This time slot is already booked", 400);
    }
  }

  // Update appointment
  const updatedAppointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    {
      ...(status && { status }),
      ...(appointmentDate && { appointmentDate }),
      ...(appointmentTime && { appointmentTime }),
      ...(reason && { reason }),
      ...(notes && { notes }),
      ...(prescription && { prescription })
    },
    { new: true, runValidators: true }
  ).populate([
    { path: "patient", select: "name email" },
    { path: "doctor", populate: { path: "user", select: "name" } }
  ]);

  if (updatedAppointment && updatedAppointment.patient && updatedAppointment.patient.email) {
    const html = `<p>Dear ${updatedAppointment.patient.name},</p>
      <p>Your appointment has been updated. New details:<br/>
      Date: <b>${updatedAppointment.appointmentDate}</b><br/>
      Time: <b>${updatedAppointment.appointmentTime}</b><br/>
      Doctor: Dr. ${updatedAppointment.doctor.user.name}
      </p>
      <p>If you did not request this change, please contact us.</p>`;
    sendOTPEmail(updatedAppointment.patient.name, updatedAppointment.patient.email, html);
  }

  successResponse(res, updatedAppointment, "Appointment updated successfully", 200);
});

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private (Admin)
export const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  
  if (!appointment) {
    return errorResponse(res, "Appointment not found", 404);
  }

  await Appointment.findByIdAndDelete(req.params.id);
  successResponse(res, null, "Appointment deleted successfully", 200);
});

// @desc    Get appointment statistics
// @route   GET /api/appointments/stats
// @access  Private (Admin)
export const getAppointmentStats = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  
  const query = {};
  if (startDate && endDate) {
    query.appointmentDate = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  const stats = await Appointment.aggregate([
    { $match: query },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    }
  ]);

  const total = await Appointment.countDocuments(query);
  const today = await Appointment.countDocuments({
    ...query,
    appointmentDate: {
      $gte: new Date().setHours(0, 0, 0, 0),
      $lt: new Date().setHours(23, 59, 59, 999)
    }
  });

  const statsObject = {
    total,
    today,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    noShow: 0
  };

  stats.forEach(stat => {
    statsObject[stat._id] = stat.count;
  });

  successResponse(res, statsObject, "Appointment statistics retrieved successfully", 200);
}); 

// --- Helper: Generate next available weekdays (Mon-Sat, skip Sunday) ---
function getNextAvailableDays() {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const weekday = d.toLocaleDateString('en-US', { weekday: 'long' });
    if (weekday !== 'Sunday') {
      days.push({
        date: d.toISOString().slice(0, 10),
        weekday
      });
      if (weekday === 'Saturday') break;
    }
  }
  return days;
}

// --- Helper: Generate slots for a given day ---
function getSlotsForDay(weekday) {
  // All slots in 24h format
  const slots = [
    '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30',
  ];
  // Sunday closed, but if ever needed, only till 14:00
  if (weekday === 'Sunday') return [];
  if (weekday === 'Saturday') return slots; // Saturday full day
  return slots;
}

// --- API: Get available days ---
export const getAvailableDays = asyncHandler(async (req, res) => {
  const days = getNextAvailableDays();
  successResponse(res, days, 'Available days fetched');
});

// --- API: Get available slots for a date ---
export const getAvailableSlots = asyncHandler(async (req, res) => {
  const { date, doctorId } = req.query;
  if (!date) return errorResponse(res, 'Date is required', 400);
  const d = new Date(date);
  const weekday = d.toLocaleDateString('en-US', { weekday: 'long' });
  if (weekday === 'Sunday') return errorResponse(res, 'Sunday is closed', 400);

  // Get all slots for this day
  let slots = getSlotsForDay(weekday);

  // Find booked slots for this doctor on this date
  const query = {
    appointmentDate: new Date(date),
    status: { $in: ['pending', 'confirmed'] },
  };
  if (doctorId) query.doctor = doctorId;
  const appointments = await Appointment.find(query);
  const bookedTimes = appointments.map(a => a.appointmentTime);

  // Mark slots as available or not
  const slotList = slots.map(time => ({
    time,
    available: !bookedTimes.includes(time)
  }));

  successResponse(res, slotList, 'Available slots fetched');
}); 