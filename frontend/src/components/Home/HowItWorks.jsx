import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How JOB PORTAL Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
               Before Applying / Post for any Job, You have to create account first.
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Apply a Job/Post a Job</p>
              <p>
                After create account You now able to apply / post Job According to your Interest and skills.
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply For Job/Recruit Suitable Candidates</p>
              <p>
                According to your Interest and skills You can apply or recruit Suitable candidates.
              </p>
            </div>
          </div>
        </div>  
      </div>
    </>
  );
};

export default HowItWorks;
