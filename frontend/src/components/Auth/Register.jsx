import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill, RiEyeOffLine, RiEyeLine } from "react-icons/ri";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isAuthorized, setIsAuthorized } = useContext(Context);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { email, role, password, confirmPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("");
      navigate('/verify-otp', { state: { email } });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={'/'} />;
  }

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

  const iconStyle = {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
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

  const linkStyle = {
    textAlign: 'left',
    color: 'blue',
    textDecoration: 'underline',
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <div style={headerStyle}>
          <img src="/FindJob.png" alt="logo" style={{ width: "120px", height: "95px" }} />
          <h3>Register</h3>
        </div>
        <form onSubmit={handleRegister}>
          <div style={inputContainerStyle}>
            <label>Register As</label>
            <div style={{ position: 'relative' }}>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={inputStyle}
              >
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser style={iconStyle} />
            </div>
          </div>
          <div style={inputContainerStyle}>
            <label>Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                style={inputStyle}
              />
              <MdOutlineMailOutline style={iconStyle} />
            </div>
          </div>
          <div style={inputContainerStyle}>
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                style={inputStyle}
              />
              {showPassword ? (
                <RiEyeLine
                  onClick={() => setShowPassword(false)}
                  style={iconStyle}
                />
              ) : (
                <RiEyeOffLine
                  onClick={() => setShowPassword(true)}
                  style={iconStyle}
                />
              )}
            </div>
          </div>
          <div style={inputContainerStyle}>
            <label>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Your Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                style={inputStyle}
              />
              {showConfirmPassword ? (
                <RiEyeLine
                  onClick={() => setShowConfirmPassword(false)}
                  style={iconStyle}
                />
              ) : (
                <RiEyeOffLine
                  onClick={() => setShowConfirmPassword(true)}
                  style={iconStyle}
                />
              )}
            </div>
          </div>
          <button type="submit" style={buttonStyle}>
            Register
          </button>
          Already have an account? 
          <Link to="/login" style={linkStyle}>
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
