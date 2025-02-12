import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60); 
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (timeLeft <= 0) {
      toast.error("OTP has expired. Please request a new one.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/verify-otp",
        { email, otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      localStorage.setItem("token", response.data.token);
      toast.success("Verification successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message || "Verification failed. Please check your OTP and try again.");
    }
  };

  const handleResendOtp = async () => {
    if (timeLeft > 0) return;
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/resend-otp",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setTimeLeft(60); // Reset the countdown timer to 60 seconds
    } catch (error) {
      toast.error(error.response.data.message || "Failed to resend OTP. Please try again later.");
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    height: '100vh',
    padding: '20px',
  };

  const formContainerStyle = {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  };

  const headerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const inputContainerStyle = {
    marginBottom: '15px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const resendButtonStyle = {
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    backgroundColor: timeLeft > 0 ? 'grey' : 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: timeLeft > 0 ? 'not-allowed' : 'pointer',
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <div style={headerStyle}>
          <img src="/FindJob.png" alt="logo" style={{ width: "120px", height: "95px" }} />
          <h3>Verify OTP</h3>
        </div>
        <form onSubmit={handleVerifyOtp}>
          <div style={inputContainerStyle}>
            <label>OTP</label>
            <input
              type="text"
              placeholder="Enter your OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              autoComplete="off"
              style={inputStyle}
            />
          </div>
          <button type="submit" style={buttonStyle}>
            Verify OTP
          </button>
        </form>
        <button
          onClick={handleResendOtp}
          disabled={timeLeft > 0}
          style={resendButtonStyle}
        >
          Resend OTP ({timeLeft > 0 ? `${timeLeft}s` : 'Resend'})
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
