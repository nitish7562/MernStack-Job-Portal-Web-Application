import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:4000/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <>
      <div className="myJobs page">
        <div className="container">
          <h1>Your Posted Jobs</h1>
          {myJobs.length > 0 ? (
            <>
              <div className="banner">
                {myJobs.map((element) => (
                  <div className="card" key={element._id}>
                    <div className="content">
                      <div className="short_fields">
                        <div>
                          <span>Company:</span>
                          <input
                            type="text"
                            disabled={editingMode !== element._id}
                            value={element.company}
                          />
                        </div>
                        <div>
                          <span>Title:</span>
                          <input
                            type="text"
                            disabled={editingMode !== element._id}
                            value={element.title}
                            onChange={(e) =>
                              handleInputChange(element._id, "title", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <span>Country:</span>
                          <input
                            type="text"
                            disabled={editingMode !== element._id}
                            value={element.country}
                            onChange={(e) =>
                              handleInputChange(element._id, "country", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <span>City:</span>
                          <input
                            type="text"
                            disabled={editingMode !== element._id}
                            value={element.city}
                            onChange={(e) =>
                              handleInputChange(element._id, "city", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <span>Category:</span>
                          <select
                            value={element.category}
                            onChange={(e) =>
                              handleInputChange(element._id, "category", e.target.value)
                            }
                            disabled={editingMode !== element._id}
                          >
                           <option value="Linux Administrator">Linux Administrator</option>
                           <option value="DevOps Engineer">DevOps Engineer</option>
                           <option value="Frontend Web Development">Frontend Web Development</option>
                           <option value="Backend Development">Backend Development</option>
                           <option value="Fullstack Developer">Fullstack Developer</option>
                           <option value="UI UX Designer">UI UX Designer</option>
                           <option value="Software Tester">Software Tester</option>
                           <option value="MEAN Stack Development">MEAN STACK Development</option>
                           <option value="MERN Stack Development">MERN STACK Development</option>
                           <option value="System Engineer">System Engineer</option>
                           <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <span>Salary:</span>{" "}
                          {element.fixedSalary ? (
                            <input
                              type="number"
                              disabled={editingMode !== element._id}
                              value={element.fixedSalary}
                              onChange={(e) =>
                                handleInputChange(element._id, "fixedSalary", e.target.value)
                              }
                            />
                          ) : (
                            <div>
                              <input
                                type="number"
                                disabled={editingMode !== element._id}
                                value={element.salaryFrom}
                                onChange={(e) =>
                                  handleInputChange(element._id, "salaryFrom", e.target.value)
                                }
                              />
                              <input
                                type="number"
                                disabled={editingMode !== element._id}
                                value={element.salaryTo}
                                onChange={(e) =>
                                  handleInputChange(element._id, "salaryTo", e.target.value)
                                }
                              />
                            </div>
                          )}
                        </div>
                        <div>
                          <span>Expired:</span>
                          <select
                            value={element.expired}
                            onChange={(e) =>
                              handleInputChange(element._id, "expired", e.target.value)
                            }
                            disabled={editingMode !== element._id}
                          >
                            <option value={true}>TRUE</option>
                            <option value={false}>FALSE</option>
                          </select>
                        </div>
                        <div>
                          <span>Experience Level:</span>
                          <select
                            value={element.experienceLevel}
                            onChange={(e) =>
                              handleInputChange(element._id, "experienceLevel", e.target.value)
                            }
                            disabled={editingMode !== element._id}
                          >
                            <option value="Fresher">Fresher</option>
                            <option value="Experienced">Experienced</option>
                          </select>
                        </div>
                        <div>
                          <span>Experience Years:</span>
                          {element.experienceLevel === "Fresher" ? (
                            <input
                              type="text"
                              value="0"
                              disabled
                            />
                          ) : (
                            <select
                              value={element.experienceYears}
                              onChange={(e) =>
                                handleInputChange(element._id, "experienceYears", e.target.value)
                              }
                              disabled={editingMode !== element._id}
                            >
                              <option value="1">1 Year</option>
                              <option value="2">2 Years</option>
                              <option value="3">3 Years</option>
                              <option value="4">4 Years</option>
                              <option value="5">5 Years</option>
                              <option value="6">6 Years</option>
                              <option value="7">7 Years</option>
                              <option value="8">8 Years</option>
                              <option value="9">9 Years</option>
                              <option value="10">10+ Years</option>
                            </select>
                          )}
                        </div>
                      </div>
                      <div className="long_field">
                        <div>
                          <span>Description:</span>{" "}
                          <textarea
                            rows={5}
                            value={element.description}
                            disabled={editingMode !== element._id}
                            onChange={(e) =>
                              handleInputChange(element._id, "description", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <span>Location:</span>{" "}
                          <textarea
                            rows={5}
                            value={element.location}
                            disabled={editingMode !== element._id}
                            onChange={(e) =>
                              handleInputChange(element._id, "location", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="button_wrapper">
                      <div className="edit_btn_wrapper">
                        {editingMode === element._id ? (
                          <>
                            <button className="check_btn" onClick={() => handleUpdateJob(element._id)}>
                              <FaCheck />
                            </button>
                            <button className="cross_btn" onClick={handleDisableEdit}>
                              <RiCloseLine />
                            </button>
                          </>
                        ) : (
                          <button className="edit_btn" onClick={() => handleEnableEdit(element._id)}>
                            Edit
                          </button>
                        )}
                      </div>
                      <button className="delete_btn" onClick={() => handleDeleteJob(element._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>You've not posted any jobs or may havedeleted all of your jobs!</p>
            )}
          </div>
        </div>
      </>
    );
  };
  
  export default MyJobs;
