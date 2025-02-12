import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const JobSearch = ({ setShow }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      await axios.get(`http://localhost:4000/api/v1/job/search?query=${query}`, {
        withCredentials: true,
      });
      navigate(`/job/search/${query}`);
      setShow(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}>
      <input
        type="text"
        placeholder="Search jobs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: '0.5rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginRight: '0.5rem',
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#007bff',
          border: 'none',
          borderRadius: '4px',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Search
      </button>
    </div>
  );
};

export default JobSearch;
