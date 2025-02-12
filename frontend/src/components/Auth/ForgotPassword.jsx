import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/forgot-password', { email })
            .then(res => {
                if (res.data.Status === "Success") {
                    setMessage('Email sent successfully!');
                    setTimeout(() => {
                        setMessage('');
                        navigate('/login');
                    }, 8000);
                } else if (res.data.Status === "User not existed") {
                    setMessage('User does not exist.');
                    setTimeout(() => {
                        setMessage('');
                    }, 8000); 
                }
            }).catch(err => {
                setMessage('Failed to send email. Please try again.');
                console.log(err);
                setTimeout(() => setMessage(''), 8000);
            });
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

    return (
        <div style={containerStyle}>
            <div style={formContainerStyle}>
                <div style={headerStyle}>
                    <img src="/FindJob.png" alt="logo" style={{ width: "120px", height: "95px" }} />
                    <h3>Forgot Password</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={inputContainerStyle}>
                        <label htmlFor="email" style={{ fontWeight: 'bold' }}>
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            style={inputStyle}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button type="submit" style={buttonStyle}>
                        Send
                    </button>
                </form>
                {message && (
                    <div style={{
                        marginTop: '10px',
                        padding: '10px',
                        backgroundColor: message.includes('successfully') ? 'green' : 'red',
                        color: 'white',
                        borderRadius: '5px',
                        textAlign: 'center'
                    }}>
                        {message}
                    </div>
                )}
                <p style={{ marginTop: '10px', textAlign: 'center' }}>
                    <Link to="/login" style={{ color: 'blue', textDecoration: 'none' }}>
                        Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword;
