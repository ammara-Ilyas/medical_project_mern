import User from "../models/User.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { sendOTPEmail } from "../../lib/nodemailer.js";

dotenv.config();

export const getAllUsers = async (req, res) => {
  console.log("get all users");

  try {
    const users = await User.find({}).select('-password');
    return res.status(200).json({
      message: "users fetched successfully",
      users: users,
    });
  } catch (error) {
    console.log("Error getting users", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signup = async (req, res) => {
  console.log("body", req.body);

  const { 
    name, 
    email, 
    phone, 
    password,
    role = "patient",
    avatar,
    dateOfBirth,
    gender,
    address,
    medicalHistory
  } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ 
      message: "Missing required fields. Name, email, phone, and password are required." 
    });
  }

  // Validate email format
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Please enter a valid email address" });
  }

  // Validate phone format
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: "Please enter a valid phone number" });
  }

  // Validate password length
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  // Validate role
  const validRoles = ["patient", "doctor", "admin"];
  if (role && !validRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role. Must be patient, doctor, or admin" });
  }

  // Validate gender if provided
  const validGenders = ["male", "female", "other"];
  if (gender && !validGenders.includes(gender)) {
    return res.status(400).json({ message: "Invalid gender. Must be male, female, or other" });
  }

  // Validate dateOfBirth if provided
  if (dateOfBirth) {
    const birthDate = new Date(dateOfBirth);
    if (isNaN(birthDate.getTime())) {
      return res.status(400).json({ message: "Invalid date of birth format" });
    }
    // Check if date is not in the future
    if (birthDate > new Date()) {
      return res.status(400).json({ message: "Date of birth cannot be in the future" });
    }
  }

  // Validate medicalHistory if provided
  if (medicalHistory && Array.isArray(medicalHistory)) {
    for (const record of medicalHistory) {
      if (record.condition && typeof record.condition !== 'string') {
        return res.status(400).json({ message: "Medical condition must be a string" });
      }
      if (record.diagnosedDate) {
        const diagnosedDate = new Date(record.diagnosedDate);
        if (isNaN(diagnosedDate.getTime())) {
          return res.status(400).json({ message: "Invalid diagnosed date format" });
        }
      }
      if (record.status && !["active", "resolved", "chronic"].includes(record.status)) {
        return res.status(400).json({ message: "Invalid medical status. Must be active, resolved, or chronic" });
      }
    }
  }

  let userExists = await User.findOne({ email });

  if (userExists) {
    if (userExists.emailVerified) {
      return res.status(400).json({ message: "User already exists with this email" });
    } else {
      // User exists but not verified — update OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      userExists.otp = otp;
      userExists.otpExpiry = Date.now() + 600000; // 10 minutes from now
      await userExists.save();

      console.log("otp (resend)", otp);
      await sendOTPEmail(
        userExists.name,
        userExists.email,
        `<h3>OTP: ${otp}</h3>`
      );

      return res
        .status(200)
        .json({ message: "OTP re-sent to email", user: userExists });
    }
  }

  // If user does not exist, create new
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const userData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      password,
      role,
      otp,
      otpExpiry: Date.now() + 600000,
    };

    // Add optional fields if provided
    if (avatar) {
      userData.avatar = avatar;
    }
    if (dateOfBirth) {
      userData.dateOfBirth = new Date(dateOfBirth);
    }
    if (gender) {
      userData.gender = gender;
    }
    if (address) {
      userData.address = {
        street: address.street || "",
        city: address.city || "",
        state: address.state || "",
        zipCode: address.zipCode || "",
        country: address.country || ""
      };
    }
    if (medicalHistory && Array.isArray(medicalHistory)) {
      userData.medicalHistory = medicalHistory.map(record => ({
        condition: record.condition || "",
        diagnosedDate: record.diagnosedDate ? new Date(record.diagnosedDate) : null,
        status: record.status || "active"
      }));
    }

    const user = await User.create(userData);

    console.log("otp (new)", otp);
    await sendOTPEmail(user.name, user.email, `<h3>OTP: ${otp}</h3>`);

    res.status(200).json({ message: "OTP sent to email", user: user });
  } catch (error) {
    console.log("error", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  
  if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }
  
  user.emailVerified = true;
  user.otp = null;
  user.otpExpiry = null;
  await user.save();
  
  res.status(200).json({ message: "Email verified successfully" });
};

export const resendOTP = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Regenerate OTP and update expiry
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpiry = Date.now() + 600000; // Reset OTP expiry to 10 minutes

  await user.save();

  // Send the new OTP
  await sendOTPEmail(user.name, email, otp);
  res.status(200).json({ message: "OTP resent to email" });
};

export const login = async (req, res) => {
  console.log("body", req.body);
  const { email, password } = req.body;

  let user = await User.findOne({ email }).select('+password');

  if (user && !user.emailVerified) {
    console.log(`Deleting unverified user with email: ${email}`);
    await User.findOneAndDelete({ email });
    user = null;
  }

  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ message: "Wrong password" });
  }

  // ✅ User verified and password matches
  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.jwt_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );

  res.status(200).json({
    token,
    message: "Login successful",
    user: {
      name: user.name,
      email: user.email,
      id: user._id,
      role: user.role,
      avatar: user.avatar,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      address: user.address,
      medicalHistory: user.medicalHistory,
      isActive: user.isActive,
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    },
  });
};

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  const otpExpiry = Date.now() + 10 * 60 * 1000; // valid for 10 minutes

  user.resetOTP = otp;
  user.resetOTPExpiry = otpExpiry;
  await user.save();

  await sendOTPEmail(user.name, email, `Your OTP is: ${otp}`);

  res.status(200).json({ message: "OTP sent to email" });
};

export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.isOTPVerified) {
    return res.status(400).json({ message: "OTP not verified" });
  }

  user.password = newPassword; // Will be hashed by pre-save middleware
  user.isOTPVerified = false;
  user.resetOTP = null;
  user.resetOTPExpiry = null;
  await user.save();

  res.status(200).json({ message: "Password successfully reset" });
};

export const changePassword = async (req, res) => {
  console.log("body", req.body);
  const { currentPassword, newPassword } = req.body;

  const token = req.headers.authorization?.split(" ")[1];
  const { id } = jwt.verify(token, process.env.jwt_SECRET_KEY);
  
  const user = await User.findById(id).select('+password');
  const match = await bcrypt.compare(currentPassword, user.password);
  
  if (!match) {
    return res.status(400).json({ message: "Wrong current password" });
  }
  
  user.password = newPassword; // Will be hashed by pre-save middleware
  await user.save();
  
  res.status(200).json({ message: "Password changed successfully" });
};

export const updateProfile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { id } = jwt.verify(token, process.env.jwt_SECRET_KEY);
  
  const {
    name,
    phone,
    avatar,
    dateOfBirth,
    gender,
    address,
    medicalHistory
  } = req.body;

  try {
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (avatar) user.avatar = avatar;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;
    if (gender) user.gender = gender;
    if (address) user.address = address;
    if (medicalHistory) user.medicalHistory = medicalHistory;

    await user.save();

    res.status(200).json({ 
      message: "Profile updated successfully", 
      user: user 
    });
  } catch (error) {
    console.log("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProfile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { id } = jwt.verify(token, process.env.jwt_SECRET_KEY);
  
  try {
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ 
      message: "Profile fetched successfully", 
      user: user 
    });
  } catch (error) {
    console.log("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createDefaultAdmin = async () => {
  try {
    const adminEmail = "ammarailyas361@gmail.com";

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const adminUser = new User({
      name: "Ammara Ilyas",
      email: adminEmail,
      password: "Admin@123", // Will be hashed by pre-save middleware
      phone: "+1234567890",
      role: "admin",
      emailVerified: true, // Admin is pre-verified
      phoneVerified: true, // Admin is pre-verified
      isActive: true,
      avatar: {
        public_id: "admin_avatar",
        url: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
      },
      dateOfBirth: new Date("1990-01-01"),
      gender: "female",
      address: {
        street: "Admin Street",
        city: "Admin City",
        state: "Admin State",
        zipCode: "12345",
        country: "Admin Country"
      },
      medicalHistory: []
    });

    await adminUser.save();
    console.log("Default admin created successfully with email verification");
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};
