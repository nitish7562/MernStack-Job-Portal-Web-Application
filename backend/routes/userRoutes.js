import express from 'express';
import { register, login, logout, getUser, verifyOtp, resendOtp } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', isAuthenticated, logout);
router.get('/getuser', isAuthenticated, getUser);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp); // New endpoint for resending OTP

export default router;
