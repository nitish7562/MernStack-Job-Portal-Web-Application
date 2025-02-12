import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const { id, token } = useParams();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            alert("Please enter both password and confirm password.");
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/;

        if (!passwordRegex.test(password)) {
            alert("Password must contain at least one uppercase letter and one special character.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        axios.post(`http://localhost:4000/reset-password/${id}/${token}`, { password })
            .then(res => {
                if (res.data.Status === "Success") {
                    alert("Password successfully reset!");
                    setTimeout(() => {
                        navigate('/login');
                    }, 1000);
                }
            }).catch(err => console.log(err));
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
        marginTop: '10px',
    };

    const iconStyle = {
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
    };

    const linkStyle = {
        display: 'block',
        textAlign: 'center',
        marginTop: '10px',
        color: 'blue',
        textDecoration: 'none',
    };

    return (
        <div style={containerStyle}>
            <div style={formContainerStyle}>
                <div style={headerStyle}>
                    <img src="/FindJob.png" alt="logo" style={{ width: "120px", height: "95px" }} />
                    <h3>Reset Password</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={inputContainerStyle}>
                        <label htmlFor="password" style={{ fontWeight: 'bold' }}>New Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter Password"
                                autoComplete="new-password"
                                name="password"
                                value={password}
                                style={inputStyle}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {showPassword ? (
                                <AiOutlineEye onClick={() => setShowPassword(false)} style={iconStyle} />
                            ) : (
                                <AiOutlineEyeInvisible onClick={() => setShowPassword(true)} style={iconStyle} />
                            )}
                        </div>
                    </div>
                    <div style={inputContainerStyle}>
                        <label htmlFor="confirmPassword" style={{ fontWeight: 'bold' }}>Confirm Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                autoComplete="new-password"
                                name="confirmPassword"
                                value={confirmPassword}
                                style={inputStyle}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {showConfirmPassword ? (
                                <AiOutlineEye onClick={() => setShowConfirmPassword(false)} style={iconStyle} />
                            ) : (
                                <AiOutlineEyeInvisible onClick={() => setShowConfirmPassword(true)} style={iconStyle} />
                            )}
                        </div>
                    </div>
                    <button type="submit" style={buttonStyle}>Update</button>
                </form>
                <a href="/login" style={linkStyle}>Back to Login</a>
            </div>
        </div>
    );
}

export default ResetPassword;
