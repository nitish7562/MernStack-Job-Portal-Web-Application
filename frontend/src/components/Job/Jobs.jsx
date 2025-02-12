import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  // Fetch all jobs on initial render
  useEffect(() => {
    fetchJobs();
  }, []);

  // Function to fetch jobs based on search query
  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        searchQuery
          ? `http://localhost:4000/api/v1/job/search?query=${searchQuery}`
          : "http://localhost:4000/api/v1/job/getall",
        {
          withCredentials: true,
        }
      );
      setJobs(response.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Perform search when the form is submitted
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchJobs();
  };

  // Redirect to home if not authorized
  if (!isAuthorized) {
    navigateTo("/");
    return null;
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h2>ALL AVAILABLE JOBS</h2>
        {/* Search form */}
        <form onSubmit={handleSearchSubmit} style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            style={{
              padding: "0.5rem",
              marginRight: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </form>

        <div className="banner">
          {jobs.length > 0 ? (
            jobs.map((element) => (
              <div className="card" key={element._id}>
                <p>{element.title}</p>
                <p>{element.category}</p>
                <p>{element.country}</p>
                <Link to={`/job/${element._id}`}>Job Details</Link>
              </div>
            ))
          ) : (
            <p>No jobs found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
