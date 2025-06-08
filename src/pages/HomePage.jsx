// src/pages/HomePage.jsx
import React, { useEffect } from "react";
import "../styles/Home.css";
import logo from "../assets/ChatGPT Image 6.05.2025 г., 11_47_26.png";
import cartIcon from "../assets/cart-shopping-solid.svg";
import backgroundImage from "../assets/header.jpg";


function HomePage() {
  
  useEffect(() => {
    const hamburger = document.querySelector(".hamburger");
    const sidebar = document.querySelector(".sidebar");
    const mainContainer = document.querySelector(".main-container");

    let sidebarOpen = true;

    const handleClick = () => {
      const isMobile = window.innerWidth <= 768;
      sidebarOpen = !sidebarOpen;
      if (sidebarOpen) {
        if (isMobile) {
          if (mainContainer) {
            mainContainer.style.marginLeft = "0px";
            mainContainer.style.width = "100%";
          }
          sidebar.style.left = "10px";
        } else {
          sidebar.style.left = "10px";
          if (mainContainer) {
            mainContainer.style.marginLeft = "200px";
            mainContainer.style.width = "calc(100% - 200px)";
          }
        }
      } else {
        sidebar.style.left = "-220px";
        if (mainContainer) {
          mainContainer.style.marginLeft = "0";
          mainContainer.style.width = "100%";
        }
      }
    };

    if (hamburger) {
      hamburger.addEventListener("click", handleClick);
    }

    return () => {
      if (hamburger) {
        hamburger.removeEventListener("click", handleClick);
      }
    };
  }, []); // <--- край на useEffect

  // 🔽 А това е JSX частта
  return (
    <div className="wrapper">
      <div className="top-navbar">
        <div className="hamburger">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="top-menu">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="rotating-text-container">
            <div className="rotating-text">
              <span>Enjoy free worldwide shipping on all orders over $100</span>
              <span>Members get early access to upcoming collections</span>
              <span>New exclusive arrivals — luxury you can feel</span>
              <span>Enjoy free worldwide shipping on all orders over $100</span>
              <span>Members get early access to upcoming collections</span>
              <span>New exclusive arrivals — luxury you can feel</span>
            </div>
          </div>
          <a href="/cart">
            <img src={cartIcon} alt="cart" />
          </a>
        </div>
      </div>

      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      >
        <h1>Welcome to Loom & Co</h1>
      </div>

      <div className="sidebar">
        <ul>
          <li><a href="/" className="title">HOME</a></li>
          <li><a href="/woman" className="title">WOMAN</a></li>
          <li><a href="/man" className="title">MAN</a></li>
          <li><a href="#" className="title">ABOUT US</a></li>
          <li><a href="/profile" className="title">PROFILE</a></li>
          <li><a href="/registration" className="title">REGISTRATION</a></li>
          <li><a href="/login" className="title">LOG IN</a></li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
