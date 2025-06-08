import React from "react";
import { Link } from "react-router-dom"; // добавяме Link
import "../styles/Home.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/" className="title">HOME</Link></li>
        <li><Link to="/woman" className="title">WOMAN</Link></li>
        <li><Link to="/man" className="title">MAN</Link></li>
        <li><Link to="/profile" className="title">PROFILE</Link></li>
        <li><Link to="/registration" className="title">REGISTRATION</Link></li>
        <li><Link to="/login" className="title">LOG IN</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;

