import React from "react";
import "../styles/Home.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><a href="/home" className="title">HOME</a></li>
        <li><a href="/woman" className="title">WOMAN</a></li>
        <li><a href="/man" className="title">MAN</a></li>
        <li><a href="#" className="title">ABOUT US</a></li>
        <li><a href="/profile" className="title">PROFILE</a></li>
        <li><a href="/registration" className="title">REGISTRATION</a></li>
        <li><a href="/login" className="title">LOG IN</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
