import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Nitish.</div>
      <div>
        <Link to={"https://www.facebook.com/profile.php?id=100046289239181"} target="_blank">
          <FaFacebookF />
        </Link>
       
        <Link to={"https://www.linkedin.com/in/kumarnitish75/"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.instagram.com/nitish_sharma75/"} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
