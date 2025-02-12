import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";
import sendOtpEmail from "../utils/sendOtpEmail.js";
import crypto from 'crypto';

export const register = catchAsyncErrors(async (req, res, next) => {
  const { email, role, password, confirmPassword } = req.body;

  if (!email || !role || !password || !confirmPassword) {
    return next(new ErrorHandler("Please fill all the details!", 400));
  }

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords do not match!", 400));
  }

  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!", 400));
  }

  const otp = crypto.randomInt(100000, 999999).toString();

  const user = await User.create({
    role,
    email,
    password,
    otp
  });

  sendOtpEmail(email, otp);
  res.status(200).json({ message: 'OTP sent to your email' });
});

export const verifyOtp = catchAsyncErrors(async (req, res, next) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email, otp });

  if (!user) {
    return next(new ErrorHandler('Invalid OTP', 400));
  }

  user.isVerified = true;
  user.otp = undefined; 
  await user.save();

  sendToken(user, 200, res, 'User verified successfully!');
});

// Resend OTP
export const resendOtp = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ErrorHandler("Please provide an email!", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email!", 404));
  }

  const otp = crypto.randomInt(100000, 999999).toString(); 
  user.otp = otp;
  await user.save();

  await sendOtpEmail(user.email, otp);

  res.status(200).json({
    success: true,
    message: "OTP resent successfully to your email.",
  });
});

// Login User
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email, password, and role.", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Email not registered!", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Password is incorrect!", 400));
  }
  if (user.role !== role) {
    return next(new ErrorHandler(`User with provided email and ${role} not found!`, 404));
  }
  // if (!user.isVerified) {
  //   return next(new ErrorHandler('Please verify your email before logging in', 400));
  // }

  sendToken(user, 200, res, "User Logged In Successfully!");
});

// Logout User
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: true,
      sameSite: "None"
    })
    .json({
      success: true,
      message: "User Logged Out Successfully.",
    });
});

// Get User
export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

