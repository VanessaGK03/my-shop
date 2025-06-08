import React from "react";
import "../styles/Home.css"; // или отделен CSS ако искаш
import logo from "../assets/logo.png"; // замени с правилното име
import cartIcon from "../assets/cart-shopping-solid.svg";

const TopNavbar = () => {
  return (
    <div className="top-navbar">
      <div className="hamburger">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="top-menu">
        <div className="logo">
          <img src={logo} alt="Logo" />
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
          <img src={cartIcon} alt="Cart" />
        </a>
      </div>
    </div>
  );
};

export default TopNavbar;
